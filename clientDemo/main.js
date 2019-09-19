'use strict';
const io = require('socket.io-client');
const { JOIN , ACTION } = require('./message');
const socket = io('http://192.168.1.55:10262/skyeye');
// JOIN 事件 
// ACTION 事件
// UPDATE 事件
socket.on('response', msg => {
  console.log(`收到消息：【${msg}】`);
});

socket.on('connect', () => {
  console.log('天眼连接成功');
  socket.emit('JOIN', new JOIN('邱上哲'));
  setTimeout(()=>{
    socket.emit('ACTION', new ACTION('open_首页'));
    setTimeout(()=>{
      socket.emit('ACTION', new ACTION('click_申请'));
    },1000)
  },1000)
  // socket.emit('ACTION', new ACTION('open_首页'));
  // socket.emit('ACTION', new ACTION('click_申请'));
  // socket.emit('ACTION', new ACTION('open_课程列表'));
  // socket.emit('ACTION', new ACTION('open_模拟人生计划：影响未来的硬技能必修课'));
  // socket.emit('ACTION', new ACTION('click_申请'));
});

socket.on('sendError', msg => {
  console.log('myChat from sendError: %s!', JSON.stringify(msg));
});

// 系统事件
socket.on('disconnect', msg => {
  console.log('ops,连接关闭');
});

socket.on('disconnecting', () => {
  console.log('ops,连接关闭');
});

socket.on('error', msg => {
  console.log('ops,error')
});



