const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMessage = {
  body: Joi.object().keys({
    msg: Joi.string().required(),
  }),
};

const getMessages = {
  query: Joi.object().keys({
    msg: Joi.string(),
  }),
};

const getMessage = {
  params: Joi.object().keys({
    messageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMessage,
  getMessages,
  getMessage,
};
