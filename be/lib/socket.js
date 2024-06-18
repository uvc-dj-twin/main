const SocketIO = require('socket.io');
const tokenUtil = require('./tokenUtil');
const userService = require('../service/userService');


module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: ["http://localhost:3000", "http://localhost:5173", "http://192.168.0.14:8080", "http://localhost:8080", "http://192.168.0.64:8080"], // 허용할 출처
      methods: ['GET', 'POST'], // 허용할 메서드
      credentials: true // 인증 정보를 허용
    }
  });
  app.set('io', io);

  // 토큰 검사
  io.use((socket, next) => {
    console.log('try socket connect');
    try {
      const token = socket.handshake.headers.authorization;

      if (!token) {
        return next(new Error('Authentication error'));
      }
      
      // "Bearer " 접두사를 제거하고 JWT만 추출
      const jwtToken = token.split(' ')[1];
      const decoded = tokenUtil.verifyToken(jwtToken);
      
      // userId
      socket.userId = decoded.id;
      next();
    } catch (err) {
      return next(new Error('Authentication error'));
    }
});

io.on('connection', async (socket) => {
  // 그룹 조회
  const params = {
    id: socket.userId,
  };
  const user = await userService.info(params);

    socket.join(user.Group.id)

  });
}