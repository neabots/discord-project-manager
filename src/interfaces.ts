import { Message } from 'discord.js'

export type TDone = (...data: any[]) => any
export type TUseListener = (done: TDone, ...args: any[]) => any

export type TUnespecificDone = (emitAs: string, ...data: any[]) => any
export type TUseUnespecificListener = (done: TUnespecificDone, ...args: any[]) => any

export type TMessageListener = (done: TDone, message: Message) => any