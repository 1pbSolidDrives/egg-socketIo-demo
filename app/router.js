'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  app.io.of('/skyeye').route('JOIN', app.io.controller.chat.join);
  app.io.of('/skyeye').route('sendMsg', app.io.controller.chat.sendMsg);


  //
  // app.io.of('/skyeye').route('disconnect', app.io.controller.chat.disconnect);
  // app.io.of('/skyeye').route('error', app.io.controller.chat.error);
  router.get('/', app.controller.home.index);
  // app.io.of('/skyeyeAdmin').route('getInfo', app.io.controller.admin.getInfo);

};
