# Microservice chat


## Env
```sh
NATS_SERVER_URL || 	nats://localhost:4222

DB_USERNAME || "postgres"
DB_PASSWORD || "123456"
DB_DATABASE || "chat"
DB_HOST || "127.0.0.1"
DB_CONNECTION || "postgresql"

```


## Nats lisener example
```sh
const broker = require('broker');

broker.on('chat:createQuote', QuoteController.create);
broker.on('chat:updateQuote', QuoteController.update);
broker.on('chat:destroyQuote', QuoteController.destroy);
broker.on('chat:getAllQuote', QuoteController.getAll);
broker.on('chat:assignQuote', QuoteController.assign);

broker.on('chat:joinRoom', ChatController.joinRoom);
broker.on('chat:sendMessage', ChatController.sendMessage);
```
