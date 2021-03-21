const express = require('express');
const uuid = require('uuid');
const mdx = require('epi-mdx-library');

const logger = require('../../../config/logger');
const { createNewUserAccount } = require('../../services/users/users.services');

const router = express.Router();

/**
 * @openapi
 *
 * /users/:
 *   post:
 *     tags: ['User-Management']
 *     summary: New User Account
 *     description: creates new user account
 *     responses:
 *       200:
 *         description: returns a json object with the new user information.
 */
router.post('/', async (req, res) => {
  const correlationId = uuid.v4();
  res.setHeader('x-correlation-id', correlationId);
  try {
    const { email, username, password, status, worker } = req.body;
    const result = await createNewUserAccount(
      { email, username, password, status, worker },
      correlationId
    );

    return res.status(200).json({
      result,
      msg: result.status
        ? mdx.success.successCreate
        : mdx.warnings.recordAlreadyExists,
    });
  } catch (error) {
    logger.error(
      JSON.stringify({
        correlationId,
        error: { name: error.name, msg: error.message, stack: error.stack },
      })
    );

    return res.status(500).json({
      error: {
        msg: mdx.errors.internalServerError,
        executionTime: Date.now(),
      },
    });
  }
});

module.exports = router;
