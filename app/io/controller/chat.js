'use strict';
const underscore = require('underscore');
const sockets = {};
module.exports = app => {
  class Controller extends app.Controller {
    async error() {

    }

    async disconnect() {
      this.ctx.socket.emit('response', '欢迎光临 disconnect');
    }

    async join() {
      const { app, socket, logger, helper } = this.ctx;
      const id = socket.id;
      socket.handshake.test = 'aaa';
      sockets[id] = socket;
      const message = this.ctx.args[0];
      // handshake 是干什么的？可以理解为一个缓存容器
      // 只在connect的时候有？不是
      // 如果只有socketId 怎么获取这个数据呢？
      // 每次传递socket的时候可以带上保存在handshake中的数据，但是无法从this.ctx.app.io.sockets.sockets中提取
      // 如果单独建立一个数组可不可以保存呢 可以，但是在不同的worker进程间是不共享的，这个需要一个redis来缓存了
      console.log('socket.handshake: ', socket.handshake);


      this.ctx.socket.join(id);


      await socket.emit('response', id);

    }

    async sendMsg() {
      const { app, socket, logger, helper } = this.ctx;
      console.log('socket.handshake.test: ', socket.handshake.test);
      const room = 'default_room';
      const id = this.ctx.args[0];
      const newId = id.replace('/skyeye#', '');
      const toSocket = this.ctx.app.io.sockets.sockets[newId];
      console.log('this.ctx.app.io.sockets.sockets: ', this.ctx.app.io.sockets.sockets);
      // console.log('incex: ', incex);
      // console.log('toSocket: ', toSocket);
      // console.log('toSocket: ', toSocket);
      // console.log('toSocket.handshake: ', toSocket.handshake);
      sockets[id].emit('newMessage', { msg: 'welcome', id });
      // this.ctx.app.io.of('/skyeye').to(id).emit('newMessage', { msg: 'welcome', id });
    }

  }
  return Controller;
};
