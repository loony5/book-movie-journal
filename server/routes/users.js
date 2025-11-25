const express = require('express');
const userController = require('../controllers/userController');

module.exports = (conn) => {
  const router = express.Router();
  const controller = userController(conn);

  router.post('/join', controller.join);
  router.post('/login', controller.login);
  router.get('/session', (req, res) => {
    console.log('### session : ', req.session.user);
    if (req.session && req.session.user) {
      res.json({ isLoggedIn: true, user: req.session.user });
    } else {
      res.json({ isLoggedIn: false, user: null });
    }
  });

  router.post('/logout', (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('session_cookie_name');
      res.json({ message: '로그아웃 완료' });
    });
  });

  // 네이버 로그인
  router.get('/naver/login', controller.naverLogin);
  router.get('/auth/naver/callback', controller.naverCallback);

  return router;
};
