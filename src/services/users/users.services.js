const { Users, Sequelize } = require('epi-data-entities');
const uuid = require('uuid');

const logger = require('../../../config/logger');
const { generatePin } = require('../../helper/commons.helper');

const { Op } = Sequelize;
const date = new Date();

const createNewUserAccount = async (params, correlationId) => {
  logger.debug(date);
  try {
    logger.debug({ correlationId, params });

    const pin = await generatePin();

    logger.debug({ pin });

    const [record, status] = await Users.findOrCreate({
      where: {
        email: { [Op.like]: params.email },
      },
      defaults: {
        id: uuid.v4(),
        branchId: uuid.v4(), // mock only
        email: params.email,
        password: params.password,
        status: params.status,
        createdBy: params.worker,
        modifiedBy: params.worker,
        pin,
        userTypeId: uuid.v4(), // mock only
      },
      logging: (sql) => logger.info(JSON.stringify(correlationId, sql)),
      benchmark: true,
    });

    logger.info(JSON.stringify({ record, status }));
    return { record, status } || undefined;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserAccount = () => {};

module.exports = { createNewUserAccount, getUserAccount };
