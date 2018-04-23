import axios from 'axios';
import io from 'socket.io-client';
const socket = io.connect('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST'