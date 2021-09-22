const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createKitchen = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getKitchens = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getKitchen = {
  params: Joi.object().keys({
    kitchenId: Joi.string().custom(objectId),
  }),
};

const updateKitchen = {
  params: Joi.object().keys({
    kitchenId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
    })
    .min(1),
};

const deleteKitchen = {
  params: Joi.object().keys({
    kitchenId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createKitchen,
  getKitchens,
  getKitchen,
  updateKitchen,
  deleteKitchen,
};
