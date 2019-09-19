# 说明

- ## 依赖

1. 安装 egg-socket.io npm i egg-socket.io --save
2. plugin.js

    ```
    'use strict';
    /** @type Egg.EggPlugin */
    module.exports = {
    io: { enable: true, package: 'egg-socket.io' },
    };
    ```

3. config.js

    ```
    config.io = {
        namespace: {
        '/': {
            connectionMiddleware: [ /* 'auth', 'errorMaster' */ ],
            packetMiddleware: [ /* 'filter', 'errorMaster' */ ],
        },
        // namespace 相当于http中的path 具体使用的时候可以在router.js中看到
        '/skyeye':
        {
            connectionMiddleware: [ 'auth' ],// 建立链接的时候的会被调用的中间件 存放位置在 app/io/middleware
            packetMiddleware: [ /* 'filter' */ ], // 每次请求会被调用的中间件 存放位置在 app/io/middleware
        },
        },
        // 注意： 如果项目中同时使用了 egg-redis， 请单独配置，不可共用。
        redis: {
            port: 6379,
            host: '127.0.0.1',
            password: '123',
            db: 0,
        },
    };
    }
    ```

- ## 细节

1. router.js (namespace)
   ```
   app.io.of('/skyeye').route('JOIN', app.io.controller.chat.join);
   ```
   `of('/skyeye')` 代表 namespace
   `'JOIN'` 代表 event
   `app.io.controller.chat.join` 代表调用哪一个方法
   对应的客户端部分

    ```
    const io = require('socket.io-client');
    const socket = io('http://192.168.1.25:10263/skyeye'); // `/skyeye` 对应的就是上面的namespace
    ```

2. socketIo 相关的 `controller middleWare` 都在目录`app/io/`下单独的文件夹里，具体原因不清楚，只知道官方例子是这么写的
3. room
   说明：room 就是字面的意思，但是也可以通过把 room 名设置成 socketid 的方法单独给某个 socket 发消息
   添加到 room

    ```
    const id = this.ctx.socket.id;
    this.ctx.socket.join(id); // id可以是其他的字符串，也可以是 socket的唯一id 这样可以方便给人单独发送消息
    ```

4. 消息处理

    ```

        async join() {
        const { app, socket, logger, helper } = this.ctx;
        const id = socket.id;
        const message = this.ctx.args[0];// 获取客户端发来的消息
        await socket.emit('response', '返回消息');// 给客户端发送消息
        }
    ```

5. socket 对象中存放自定义数据

    ```
    // 服务端客户端都可以在socket.handshake 里面加东西，可以互相解析出来的 这里面还保存着cookie等信息
    this.ctx.socket.handshake.test = 'aaa';
    ```

    关于 handshake 的扩展 地址 (http://deadhorse.me/nodejs/2011/12/29/socket.io_induction.html)

- ## 可能遇到的问题

1. 通过 socketId 获取 socket 对象的一些坑……
   通过一下方法可以获取到 socket 对象 但是这个对象发送消息的 时候有一些问题

    ```
        const underscore = require('underscore');
        const socketId = this.ctx.socket.id;
        const toSocket = underscore.findWhere( this.ctx.app.io.sockets.sockets, { id: socketId });
    ```

    说明：

    1. 这个思路时可以获取到对应的 socket 对象，并且也可以通过这个对象发送消息，但是目前我测试的客户端只在 namespace 为'/'的情况下正常接收到了消息 具体问题还在找……
    2. 有的时候获取不到，具体原因未知
