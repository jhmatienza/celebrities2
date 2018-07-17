const express = require('express');
const router = express.Router();
const celebritiesController = require('../controllers/celebrities.controller');

const authMiddleware = require('../middlewares/auth.middleware.js')

router.get(
  '/create',
  authMiddleware.authenticateUser,
  celebritiesController.create
);

router.post(
  '/create',
  authMiddleware.authenticateUser,
  celebritiesController.doCreate
);

router.get(
  '/',
  authMiddleware.authenticateUser,
  celebritiesController.list
);

router.get(
  '/:id',
  authMiddleware.authenticateUser,
  celebritiesController.get
);

router.get(
  '/:id/update',
  authMiddleware.authenticateUser,
  celebritiesController.update
);

router.post(
  '/:id/update',
  authMiddleware.authenticateUser,
  celebritiesController.doUpdate
);

router.post(
  '/:id/delete',
  authMiddleware.authenticateUser,
  celebritiesController.delete
);

module.exports = router;
