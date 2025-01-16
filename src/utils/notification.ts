import { RequestQueue } from './queue'

class NotificationPoller {
  private poll: () => any

  private interval: number

  private lastAnimationFrameId: number | null = null

  private callback: (data: any)=> void

  private lastExecutionTime: number = 0

  public requestQueue: RequestQueue

  constructor(
    poll: () => any,
    interval = 3000,
    concurrency = 3,
    callback: (data: any)=> void
  ) {
    this.poll = poll
    this.interval = interval
    this.callback = callback
    this.requestQueue = new RequestQueue(concurrency)
  }

  private createRequestTask(poll: () => any): () => Promise<any> {
    return async () => {
      try {
        let response: any
        response = await poll()
        this.interval = response?.data?.nextQueryAfter || 3000;
        if (response) {
          try {
            this.callback({notifications: response?.data?.notifications || []})
          } catch (emitError) {
            console.warn(`轮播失败`, emitError)
          }
        }

        return response
      } catch (error) {
        console.error(`轮播失败`, error)
        throw error
      }
    }
  }

  private async executeNotifications(): Promise<any> {
    try {
      const requestTasks = this.createRequestTask(this.poll)
      await Promise.all([requestTasks()])
    } catch (error) {
      console.error('executeNotifications error:', error)
      // 如果出现错误，等待一段时间后重试
      if (this.lastAnimationFrameId !== null) {
        setTimeout(() => {
          this.executeNotifications()
        }, this.interval)
      }
    }
  }

  private scheduleNextExecution = () => {
    const now = new Date().getTime()
    const timeSinceLastExecution = now - this.lastExecutionTime

    if (timeSinceLastExecution >= this.interval) {
      this.executeNotifications()
      this.lastExecutionTime = now
    }

    this.lastAnimationFrameId = setTimeout(this.scheduleNextExecution, this.interval)
  }

  public start(): void {
    if (this.lastAnimationFrameId) {
      return
    }

    // console.log('启动通知轮询，间隔:', this.interval, 'ms')
    this.executeNotifications()
    this.lastExecutionTime = new Date().getTime()
    this.lastAnimationFrameId = setTimeout(this.scheduleNextExecution, this.interval)
  }

  public stop(): void {
    if (this.lastAnimationFrameId) {
      cancelAnimationFrame(this.lastAnimationFrameId)
      this.lastAnimationFrameId = null
    }
  }

}

let poller: NotificationPoller
export const openNotification = (polling: any, callback: (data: any)=> void) => {
  if (!poller) {
    poller = new NotificationPoller(polling, 5000, 3, callback)
    poller.start()
  }
}
