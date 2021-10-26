const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    vendorId: Joi.string().custom(objectId),
    items: Joi.array().items(Joi.string()),
    status: Joi.string().required(),
    amount: Joi.number().required(),
    date: Joi.string(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    vendorId: Joi.string().custom(objectId),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId),
      vendorId: Joi.string().custom(objectId),
      items: Joi.array().items(Joi.string()),
      status: Joi.string().required(),
      amount: Joi.number().required(),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
