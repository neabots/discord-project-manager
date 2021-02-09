import { Client } from 'discord.js'
import EventEmitter from 'events'
import { TDone, TMessageListener, TUnespecificDone, TUseListener, TUseUnespecificListener } from './interfaces'

class Application extends EventEmitter {
  constructor(
    private client: Client
  ) {
    super()
  }

  swerveEvent(trigger: string, emitAs: string, fn: TUseListener): this {
    this.client.on(trigger, (...data: any[]) => {
      fn((...result) => this.emit(emitAs, ...result), ...data)
    })
    return this
  }

  swerveEventTo(trigger: string, fn: TUseUnespecificListener): this {
    this.client.on(trigger, (...data: any[]) => {
      fn((emitAs, ...result) => this.emit(emitAs, ...result), ...data)
    })
    return this
  }

  onMessage(emitAs: string, fn: TMessageListener): this {
    this.client.on('message', (message) => {
      const done = (...result: any[]) => this.emit(emitAs, ...result)
      fn(done, message)
    })
    return this
  }

  async start(token: string | undefined): Promise<string> {
    return this.client.login(token)
  }
}

export { Application }