/* eslint-disable no-plusplus */
export class RequestQueue {
  private queue: (() => Promise<any>)[] = []

  private running: number = 0

  private readonly concurrency: number

  constructor(concurrency: number) {
    this.concurrency = concurrency
  }

  public async add<T>(task: () => Promise<T>): Promise<T> {
    if (this.running < this.concurrency) {
      return this.runTask(task)
    }

    return new Promise<T>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  private async runTask<T>(task: () => Promise<T>): Promise<T> {
    this.running++
    try {
      const result = await task()
      return result
    } catch (error) {
      console.error('Task execution failed:', error)
      throw error // 重要：需要重新抛出错误
    } finally {
      this.running--
      this.processQueue()
    }
  }

  private processQueue(): void {
    if (this.queue.length === 0 || this.running >= this.concurrency) {
      return
    }

    const nextTask = this.queue.shift()
    if (nextTask) {
      this.runTask(nextTask)
        .catch(error => {
          console.error('Queue task error:', error)
          // 这里的错误已经被前面的 Promise reject 处理了
        })
    }
  }

  public clear(): void {
    this.queue = []
    this.running = 0
  }

  public get size(): number {
    return this.queue.length
  }

  public get activeCount(): number {
    return this.running
  }
}
