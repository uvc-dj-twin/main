const logger = require("./logger");
const tokenUtil = require("./tokenUtil");

const middleware = {
  // 로그인 확인
  isLoggedIn(req, res, next) {
    const token = req.headers && req.headers.token;
    try {
      if (token) {
        // 토큰 유효한지 확인
        const decoded = tokenUtil.verifyToken(token);
  
        if (decoded) {
          req.user = {
            id: decoded.id,
            role: decoded.role
          }
          // 토큰 유효하면 새로운 토큰으로 갱신(만기시간 초기화)
          const newToken = tokenUtil.makeToken(decoded);
          res.set("token", newToken);
  
          next();
        } else {
          throw new CustomError(401, 'Unauthorized')
        }
      } else {
        throw new CustomError(401, 'Unauthorized')
      }
    } catch (err) {
      next(err);
    }
  },

  // 권한 확인
  isRightRole(roles) {
    return function (req, res, next) {
      currentUser = req.user;
      let flag = true;
      console.log(currentUser);
      if (currentUser.role) {
        roles.map(role => {
          if (currentUser.role === role) {
            flag = false;
            next();
          }
        })
      }

      if (flag) {
        const err = new CustomError(403, 'Forbidden')
        next(err);
      }
    };
  },
};

module.exports = middleware;
