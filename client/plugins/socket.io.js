import io from 'socket.io-client';
import { SOCKET_URL } from '../constants/env-vars';

const user = localStorage.getItem('user');
const token = user && JSON.parse(user).token;

const socket = io(SOCKET_URL, {
  query: {
    authorization: token || ''
  }
});

export default socket;
