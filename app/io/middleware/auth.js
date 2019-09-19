'use strict';
const room = 'default_room';
const PREFIX = 'sang2';

module.exports = () => {
  return async (ctx, next) => {
    console.log('aaaaaaaaa');


    await next();


  };
};
