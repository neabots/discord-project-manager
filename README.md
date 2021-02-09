### Start your application by using

```javascript
const application = new Application()
application.start('yor token')
```

### Changing event routes, and using as middlewares

In this example we swerve the event `message` to `message-content` and applying a method to run before call the `message-content`
```typescript
application.swerveEvent(
  'message',
  'message-content',
  (done, message: Message) => {
    if (message.content) done(message.content)
  }
)
```
The first parameter `done` allows you to swerve the event (calls the other one), if your function don't get satisfied, you can just ignore the function.

# Methods

#### `application.swerveEvent(trigger, emitAs, fn)`
> Swerves an event to other one
- trigger: - `string` | Event that will be listened by the application i.g.: `message`
- emitAs - `string` | The event's name to be emitted by the application
- fn - `TUseListener` | Callback with arguments to the emitted event

```typescript
application.swerveEvent('message', 'big-content', (done, message: Message) => {
  if (message.content.length > 1000) {
    done(message.content, message.author.id)
  }
})

applicaiton.on('big-content', (content, authorID) => {
  console.log(`the user: ${authorID} send a big content! length: ${content.length}`)
})
```

#### `application.swerveEventTo(trigger, fn)`
> Swerves an event to other one
- trigger: - `string` | Event that will be listened by the application i.g.: `message`
- fn - `TUseUnespecificListener` | Callback with the event name to be emitted and its arguments

```typescript
application.swerveEventTo('guildCreate', (unespecificDone, guild) => {
  unespecificDone('new-guild-added', guild.name)
})

application.on('new-guild-added', (guildName) => {
  console.log(`I joined the guild: ${guildName}`)
})
```

#### `application.onMessage(emitAs, fn(done, ...args: any[]))`
> Swerves the event `message` to `attachment`
```typescript
const swerveToAttachment: TMessageListener = (done, message) => {
  if (message.attachments.size > 0) {
    done(message.attachments.first())
  }
}

application.onMessage('attachment', swerveToAttachment)

application.on('attachment', attachment => {
  // Use the attachment here!
})
```
