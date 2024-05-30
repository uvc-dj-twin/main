const express = require('express');
const router = express.Router();

const userRouter = require('./user')
const authRouter = require('./auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter)
router.use('/auth', authRouter)

module.exports = router;
