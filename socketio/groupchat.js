/*
 * Socket.io handler for chatting
 * 
 * @author Mike
 */
'use strict';

import path from 'path';
import logger from '../util/logger';
import util from '../util/socketio_util';

import Database from '../database/database_mysql';
const database = new Database('database_mysql');

class GroupChatHandler {

    constructor() {
        logger.debug('GroupChatHandler initialized.');

        this.clientCount = 0;
    }

    /**
     * Method to handle 'login_group' event
     */
    async login_group(io, socket, event, input, namespace, redis) {
        logger.debug('login_group called. this server namespace -> ' + namespace);
 
        socket.join(input.roomId);

        // send response
        util.sendResponse(io, socket, event, '200', 'login success.', input.roomId);
     
    };

    /**
     * Method to handle 'logout_group' event
     */
    async logout_group(io, socket, event, input, namespace, redis) {
        logger.debug('logout_group called. this server namespace -> ' + namespace);
 
        socket.leave(input.roomId);

        // send response
        util.sendResponse(io, socket, event, '200', 'logout_group success.', input.roomId);
    };


    /**
     * Method to handle 'message_group' event
     */
    message_group(io, socket, event, input, namespace, redis) {
        io.to(input.roomId).emit(event, input);
    }
    
}

module.exports = GroupChatHandler;

