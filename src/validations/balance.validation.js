const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBalance = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    vendorId: Joi.string().custom(objectId),

    amount: Joi.number().required(),
  }),
};

const getBalances = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    vendorId: Joi.string().custom(objectId),
    amount: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBalance = {
  params: Joi.object().keys({
    balanceId: Joi.string().custom(objectId),
  }),
};

const updateBalance = {
  params: Joi.object().keys({
    balanceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId),
      vendorId: Joi.string().custom(objectId),
      amount: Joi.number(),
    })
    .min(1),
};

const deleteBalance = {
  params: Joi.object().keys({
    balanceId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBalance,
  getBalances,
  getBalance,
  updateBalance,
  deleteBalance,
};
