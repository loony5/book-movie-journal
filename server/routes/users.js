const express = require('express');
const userController = require('../controllers/userController');

module.exports = (conn) => {
  const router = express.Router();
  const controller = userController(conn);

  router.post('/join', controller.join);
  router.post('/login', controller.login);

  return router;
};
