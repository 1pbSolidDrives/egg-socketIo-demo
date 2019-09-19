'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async login() {
    // 将userId和socketId保存到redis里面
    const message = this.ctx.args[0];
    // const message = '';
    if (this.ctx._.contains([ null, undefined ], message) || this.ctx._.contains([ null, undefined, '' ], message.userId)) {
      throw '参数错误,请重新登录';
    }
    await this.ctx.service.userMessage.login(message);
  }
  async queryAll() {

  }

  async newMessage() {

  }

  async setMessageIsRead() {
    const message = this.ctx.args[0];
    if (this.ctx._.contains([ null, undefined ], message) || this.ctx._.contains([ null, undefined, '' ], message.messageId)) {
      throw '参数错误';
    }
    await this.ctx.service.userMessage.setMessageIsRead(message);

  }


  async disconnecting() {

    // await this.deleteRidesInfo();

  }

  async disconnect() {
    const message = this.ctx.args[0];
    this.ctx.logger.info('disconnect!!!' + JSON.stringify(message));
    await this.ctx.service.common.deleteRidesInfoBySocket();
  }

  async error() {
    const message = this.ctx.args[0];
    this.ctx.logger.info('error!!!' + JSON.stringify(message));
    await this.ctx.service.common.deleteRidesInfoBySocket();
  }

  async ping() {
    this.ctx.logger.info('ping!!!');
  }

  async pong() {
    this.ctx.logger.info('pong!!!');

  }
}

module.exports = MessageController;
