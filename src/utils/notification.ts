import { RequestQueue } from './queue'

class NotificationPoller {
  private poll: () => any

  private interval: number

  private lastAnimationFrameId: number | null = null

  private callback: (data: any)=> void

  private lastExecutionTime: number = 0

  private isRunning: boolean = false

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
      // 删除错误重试逻辑，让正常轮询周期继续
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

  public updateCallback(callback: (data: any) => void): void {
    this.callback = callback
  }

  public start(): void {
    if (this.isRunning || this.lastAnimationFrameId) {
      return
    }

    this.isRunning = true
    this.executeNotifications()
    this.lastExecutionTime = new Date().getTime()
    this.lastAnimationFrameId = setTimeout(this.scheduleNextExecution, this.interval)
  }

  public stop(): void {
    if (this.lastAnimationFrameId) {
      clearTimeout(this.lastAnimationFrameId)
      this.lastAnimationFrameId = null
    }
    this.isRunning = false
  }

  public getStatus(): boolean {
    return this.isRunning
  }

}

let poller: NotificationPoller

/**
 * 轮询任务完成通知
 * @param polling 轮询方法
 * @param callback 回调方法
 */
export const openNotification = (polling: any, callback: (data: any)=> void) => {
  if (!poller) {
    poller = new NotificationPoller(polling, 5000, 3, callback)
    poller.start()
  } else {
    // 更新已存在 poller 的 callback
    poller.updateCallback(callback)
  }
}

/**
 * 暂停轮询任务完成通知
 */
export const pauseNotification = () => {
  if (poller) {
    poller.stop()
  }
}

/**
 * 恢复轮询任务完成通知
 */
export const resumeNotification = () => {
  if (poller) {
    poller.start()
  }
}

/**
 * 获取轮询任务完成通知状态
 */
export const getNotificationStatus = (): boolean => {
  return poller ? poller.getStatus() : false
}
