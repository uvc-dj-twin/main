const jwt = require('jsonwebtoken');

const secretKey = process.env.TOKEN_SECRET || 'fc64e3e9f7dafdbd937862566087d921';

const options = {
  expiresIn: process.env.TOKEN_EXPIRESIN || '2h',
};

const tokenUtil = {
  makeToken(user) {
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    const token = jwt.sign(payload, secretKey, options);
    
    return token;
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      return null;
    }
  }
};

module.exports = tokenUtil;
