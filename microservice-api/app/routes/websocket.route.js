// import socket from '../socket';
import ChatController from '../controllers/chat.controller';

/**
 * Routs for websocket
 * @class
 */
class WebsocketRout {
    constructor(conection, user) {
        this.conection = conection;
        this.conection.on('join', (data) => {
            ChatController.join(this.conection, {
                user,
                data,
            });
        });
        this.conection.on('sendMessage', (data) => {
            ChatController.sendMessage({
                user,
                data,
            });
        });
    }
}

export default WebsocketRout;
