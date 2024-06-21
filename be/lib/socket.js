const SocketIO = require('socket.io');
const tokenUtil = require('./tokenUtil');
const userService = require('../service/userService');
const groupMachineJoinDao = require('../dao/groupMachineJoinDao');


module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: ["http://localhost", "http://localhost:8080", "http://43.201.49.137", "http://djtwin"], // 허용할 출처
      methods: ['GET', 'POST'], // 허용할 메서드
      credentials: true // 인증 정보를 허용
    }
  });
  app.set('io', io);

  // 토큰 검사
  io.use(async (socket, next) => {
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
      const user = await userService.info({ id: decoded.id });
      if (!user.Group) {
        return next(new Error('no group'));
      }
      socket.groupId = user.Group.id;
      next();
    } catch (err) {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {

    socket.on('requestGroupData', () => {
      socket.join(socket.groupId)
    });

    socket.on('requestMachineData', async (machineId) => {
      try {
        const machine = await groupMachineJoinDao.selectOne({
          groupId: socket.groupId,
          machineId: machineId || 0,
        })
        console.log(`requestMachineData : ${machine}`)
        if (machine) {
          console.log(`requestMachineData join : ${machine}`)
          socket.join(`machine${machineId}`)
        } else {
          socket.emit('machineJoinError', { message: 'Machine not found or not accessible' });
        }
      } catch (err) {
        console.error('Error querying machine data:', err);
        socket.emit('machineJoinError', { message: 'Error querying machine data' });
      }
    });

  });
}