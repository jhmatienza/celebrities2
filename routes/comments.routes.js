const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');

const authMiddleware = require('../middlewares/auth.middleware.js')

router.post(
  '/create',
  authMiddleware.authenticateUser,
  commentsController.doCreate
);

module.exports = router;
