// socketPlugin.js
import { io } from 'socket.io-client';

export default {
  install: (app, options) => {
    let socket = null;

    function connectSocket() {
      const jwtToken = localStorage.getItem('token');
      const { host } = options;

      socket = io(`${host}`, {
        extraHeaders: {
          authorization: `Bearer ${jwtToken}`,
        },
      });

      app.config.globalProperties.$socket = socket;
      app.provide('socket', socket);
    }

    function disconnectSocket() {
      if (socket) {
        socket.disconnect();
        socket = null;
        app.config.globalProperties.$socket = null;
        app.provide('socket', null);
      }
    }

    // 로그인할 때 소켓 연결 설정
    app.config.globalProperties.$connectSocket = connectSocket;

    // 로그아웃할 때 소켓 연결 해제
    app.config.globalProperties.$disconnectSocket = disconnectSocket;

    // 애플리케이션이 시작될 때 소켓 연결 설정
    connectSocket();

    app.provide('connectSocket', connectSocket)
    // Vue 애플리케이션에서 로그아웃 이벤트를 감지하고 소켓 연결 해제
    app.provide('disconnectSocket', disconnectSocket);
  },
};
