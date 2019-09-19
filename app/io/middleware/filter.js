'use strict';


module.exports = () => {
  return async (ctx, next) => {
    console.log('ffffffff');
    console.log(ctx.packet);
    // const say = await ctx.service.user.say2();
    // ctx.socket.emit('res', 'packet!' + say);
    await next();
  };
};
