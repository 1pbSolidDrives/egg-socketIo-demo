'use strict';

// or http://127.0.0.1:7001/chat
const io = require('socket.io-client');
const socket = io('http://192.168.1.25:10263/skyeye');
const socket2 = io('http://192.168.1.25:10262/skyeyeAdmin');


// const socket = io('https://gec-api.gecacademy.cn', { path: '/message/socket.io' });


console.log('socket --------------11111--');
socket.on('newMessage', msg => {
  console.log('--------------------------newMessage1');
  console.log('newMessage!', JSON.stringify(msg));
  console.log('--------------------------newMessage2');

});
socket.on('response', msg => {
  console.log('--------------------------response1');
  console.log('response!', JSON.stringify(msg));
  console.log('--------------------------response2');

});
socket2.on('connect', () => {
  socket2.emit('getInfo');

});
socket.on('connect', () => {
  console.log('--------------------------connect');

  const resObject = {
    userId: 'cf7a1910-5b69-11e9-a959-6bbc9324bc7a',
    name: 'sang3',
  };
  // socket.emit('JOIN', resObject);

  // socket.emit('login', resObject);
  // const msg2 = {
  //   toSomeOne: 'client1',
  //   msg: '我告诉你!!!',
  // };
  // socket.emit('chat', msg2);
  // setTimeout(function() {
  //   const msg2 = {
  //     toSomeOne: '18181818181818',
  //     msg: '我告诉你!!!',
  //   };
  //   console.log('socket2');
  //   socket.emit('chat3', msg2);

  // }, 1000);
  // setTimeout(function() {
  //   const msg2 = {
  //     toSomeOne: '18181818181818',
  //     msg: '我告诉你!!!',
  //   };
  //   socket.emit('chat3', msg2);

  // }, 5000);
  // socket2.emit('myChat', '你好nmp!!');
});
socket2.on('response', msg => {
  console.log('socket2 msg: ', msg);

});
socket.on('response', msg => {
  // const msg2 = {
  //   toSomeOne: 'client1',
  //   msg: '我告诉你!!!',
  // };
  // socket.emit('res', msg2);

  console.log('response from server: %s!', msg);
  // socket.emit('disconnect', {});
  // socket.disconnect();
});
socket.on('loginMessage', msg => {
  console.log('loginMessage from server: %s!', JSON.stringify(msg));
});
socket.on('sendError', msg => {
  console.log('myChat from sendError: %s!', JSON.stringify(msg));
});
// const socket = io('/', {

//   // 实际使用中可以在这里传递参数
//   query: {
//     room: 'demo',
//     userId: `client_${Math.random()}`,
//   },

//   transports: ['websocket']
// });

// socket.on('connect', () => {
//   const id = socket.id;

//   log('#connect,', id, socket);

//   // 监听自身 id 以实现 p2p 通讯
//   socket.on(id, msg => {
//     log('#receive,', msg);
//   });
// });
socket.on('ping', msg => {
  console.log('#ping,', msg);
  // socket.emit('ping');
});
// 接收在线用户信息
socket.on('online', msg => {
  console.log('#online,', msg);
});

// 系统事件
socket.on('disconnect', msg => {
  console.log('#disconnect', msg);
  const resObject = {
    userId: '00093e10-8043-11e8-950a-83b93657ff20',
    name: 'sang2',
  };
  socket.emit('login', resObject);
  // const resObject = {
  //   userId: '4d754ad0-59a1-11e9-b120-15be2a3806ab',
  //   name: 'sang2',
  // };
  // // socket.emit('login', resObject);
  // // const msg2 = {
  // //   toSomeOne: 'client1',
  // //   msg: '我告诉你!!!',
  // // };
  // // socket.emit('chat', msg2);
  // socket.emit('login', resObject);
});

socket.on('disconnecting', () => {
  console.log('#disconnecting');
});

socket.on('error', msg => {
  console.log('connect! --------------11111');
  const resObject = {
    userId: '00093e10-8043-11e8-950a-83b93657ff20',
    name: 'sang2',
  };
  socket.emit('login', resObject);
  console.log('#error', msg);
});
