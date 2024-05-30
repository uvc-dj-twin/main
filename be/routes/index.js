const express = require('express');
const router = express.Router();

const userRouter = require('./user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter)

module.exports = router;
