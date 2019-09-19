'use strict';
module.exports = appInfo => {
  const config = exports = {};
  config.logger = { consoleLevel: 'DEBUG' };
  config.cluster = { listen: { port: 10263, hostname: '0.0.0.0' } };
  config.keys = '_1535510744042_904';
  config.tokenName = 'MESSAGEGECTOKEN';
  // config.middleware = [ 'errorHandler', 'httpInfoOutput', 'userCors' ];
  // config.domain = { list: [ '.gecacademy.cn' ] };

  // config.redis = { agent: true, clients: {
  //   main: { host: 'localhost', port: 6379, password: '', db: 0 },
  //   sub: { host: 'localhost', port: 6379, password: '', db: 0 },
  // } };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.redisHeaders = {
    webSocketReidsHead: 'SKYEYESHEAD', // 保存socketid时用的
    webSockets: 'SKYEYSELISTALL',
  };

  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: [ /* 'auth', 'errorMaster' */ ],
        packetMiddleware: [ /* 'filter', 'errorMaster' */ ],
      },
      '/skyeye': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [ /* 'filter' */ ],
      },
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '123',
        db: 0,
      },
    },
  };


  return config;
};
