import Constants from '../config/constants';
import Socket from 'socket.io';
import TokenService from './token.service';
import WebsocketRoute from '../routes/websocket.route';

/**
 * Class for Websocket extend from socket
 * @class
 */
class Websocket extends Socket {
    /**
     * Constructor conected to socket
     * @param {object} config - The websocket configs.
     * @constructor
     */
    constructor(config) {
        super(config);
        this.on('connection', this.connect.bind(this));
    }

    /**
     * Connect function created socket conection.
     * @param {object} socket - The socket conection.
     * @return {Promise} sso_token object.
    */
    async connect(socket) {
        try{
            let token = socket.handshake.query['authorization'];
            if (!token) return socket.disconnect();
            const verify = await TokenService.verify(token);
            if (!verify) return socket.disconnect();
            new WebsocketRoute(socket, verify.dataToken);
        }catch(err) {
            return socket.disconnect();
        }
    }
}

export default new Websocket({
    'path': Constants.WEBSOCKET_PATH,
});
