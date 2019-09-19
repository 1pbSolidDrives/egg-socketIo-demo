'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async getInfo() {
    const { webSockets, webSocketReidsHead } = this.app.config.redisHeaders;
    const keys = await this.ctx.service.redis.getAllKeys();
    const redis = await this.app.redisMain();

    console.log('keys: ', keys);
    const allUserJson2 = await redis.mget(keys);
    const result = allUserJson2.filter(item => !this.ctx._.contains([ null, undefined, '' ], item)).map(item => { return JSON.parse(item); });
    console.log('getInfo result: ', result);
    this.ctx.socket.emit('response', result);
  }
}

module.exports = AdminController;
