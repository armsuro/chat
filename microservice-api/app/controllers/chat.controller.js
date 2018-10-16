import BaseController from './base.controller';
import Socket from '../services/socket.service';
import ResponseService from '../services/response.service';
import Broker from 'broker';

/**
 * ChatController class
 * @class
 */
class ChatController extends BaseController {

    /**
     * Constructor function
     * @param {Object} config - Socket config.
     * @constructor
     */
    constructor(config) {
        super();
    }

    /**
     * create function send data to chat microservice and create new quote.
     * @param {Object} conection - Socket object.
     * @param {Object} requestBody - Request Body.
     * @param {Object} data - Data objet.
     */
    join = async(conection, requestBody) => {
        const { body } = await Broker.get('chat:joinRoom', {
            'user': requestBody.user,
            'data': requestBody.data,
        });
        if (body.data) {
            const id = body.data.id;
            conection.join(id);
            const room = Socket.sockets.in(id);
            room.emit('messages', ResponseService.generate('success', body.data));
        }
    }

    /**
     * sendMessage function create new message.
     * @param {Object} requestBody - Socket object.
     * @return {Object} Socket room.
     */
    sendMessage = async(requestBody) => {
        const { body } = await Broker.get('chat:sendMessage', {
            'user': requestBody.user,
            'data': requestBody.data,
        });
        if(body.data) {
            return Socket.sockets.in(body.data.quote_id)
                .emit('newMessage', ResponseService.generate('success', body.data));
        }
    }
}

export default new ChatController();
