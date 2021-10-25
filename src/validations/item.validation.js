const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    // quantity: Joi.number().required(),
    imgUrl: Joi.string(),
    price: Joi.number(),
    createdBy: Joi.string().custom(objectId),
    categoryId: Joi.string().custom(objectId),
    // availableDate: Joi.date(),
  }),
};
const getItems = {
  query: Joi.object().keys({
    name: Joi.string(),
    quantity: Joi.number(),
    isAvailable: Joi.boolean(),
    createdBy: Joi.string().custom(objectId),
    imgUrl: Joi.string(),

    // availableDate: Joi.date(),
    categoryId: Joi.string().custom(objectId),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};
const updateItem = {
  params: Joi.object().keys({
    itemId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      categoryId: Joi.string().custom(objectId),
      price: Joi.number(),
      imgUrl: Joi.string(),

      // isAvailable: Joi.boolean().required(),
      createdBy: Joi.string().custom(objectId),
      // availableDate: Joi.date(),
    })
    .min(1),
};
const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
};
