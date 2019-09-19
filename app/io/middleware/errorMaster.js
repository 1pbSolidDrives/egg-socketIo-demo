'use strict';

async function handleError(error, ctx) {
  const errorCode = error.code;
  const errorList = error.errors;
  // 参数类型的错误
  if (errorCode === 'invalid_param') {
    let errorMsg = '';
    for (const msg of errorList) {
      errorMsg += `${msg.field} ${msg.message},${msg.myMsg}`;
    }
    errorMsg = errorMsg.substring(0, errorMsg.length - 1);
    await ctx.socket.emit('sendError', { errorMsg, error });
  } else {
    await ctx.socket.emit('sendError', { error });
  }
}


module.exports = () => {
  return async function error(ctx, next) {
    try {
      await next();
    } catch (error) {
      await handleError(error, ctx);
    }
  };
};
