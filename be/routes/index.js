const express = require('express');
const router = express.Router();

const userRouter = require('./user')
const authRouter = require('./auth')
const boardRouter = require('./board')
const adminRouter = require('./admin')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/board', boardRouter)
router.use('/admin', adminRouter)

module.exports = router;
