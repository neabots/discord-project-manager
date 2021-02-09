import { Application } from './application'
import { Client } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client()

const application = new Application(client)

application.start(process.env.TOKEN)