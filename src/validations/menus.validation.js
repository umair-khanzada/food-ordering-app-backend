const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMenu = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    isAvailable: Joi.boolean().required(),
    vendorId: Joi.string().custom(objectId),
    availableDate: Joi.date(),
  }),
};

const getMenus = {
  query: Joi.object().keys({
    name: Joi.string(),
    quantity: Joi.number(),
    isAvailable: Joi.boolean(),
    vendorId: Joi.string().custom(objectId),
    availableDate: Joi.date(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMenu = {
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
};

const updateMenu = {
  params: Joi.object().keys({
    menuId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      isAvailable: Joi.boolean().required(),
      vendorId: Joi.string().custom(objectId),
      availableDate: Joi.date(),
    })
    .min(1),
};

const deleteMenu = {
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMenu,
  getMenus,
  getMenu,
  updateMenu,
  deleteMenu,
};
