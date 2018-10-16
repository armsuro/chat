import broker from 'broker';
import QuoteController from '../Controllers/quote.controller';
import ChatController from '../Controllers/chat.controller';

broker.on('chat:createQuote', QuoteController.create);
broker.on('chat:updateQuote', QuoteController.update);
broker.on('chat:destroyQuote', QuoteController.destroy);
broker.on('chat:getAllQuote', QuoteController.getAll);
broker.on('chat:assignQuote', QuoteController.assign);
broker.on('chat:waitingQuotes', QuoteController.waiting);

broker.on('chat:joinRoom', ChatController.joinRoom);
broker.on('chat:sendMessage', ChatController.sendMessage);