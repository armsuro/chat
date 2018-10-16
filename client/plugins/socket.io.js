import io from 'socket.io-client';
import { SOCKET_URL } from '../constants/env-vars';
import Cookies from 'js-cookie';

const user = Cookies.get('user');
const token = user && JSON.parse(user).token;

const socket = io(SOCKET_URL, {
  query: {
    authorization: token || ''
  }
});

export default socket;
