const httpStatus = require('http-status');
const { Kitchen } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a kitchen
 * @param {Object} kitchenBody
 * @returns {Promise<kitchen>}
 */
const createKitchen = async (kitchenBody) => {
  return Kitchen.create(kitchenBody);
};

/**
 * Query for kitchens
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryKitchens = async () => {
  const response = await Kitchen.find().sort({ _id: 'desc' });
  return response;
};

/**
 * Get kitchen by id
 * @param {ObjectId} id
 * @returns {Promise<kitchen>}
 */
const getKitchenById = async (id) => Kitchen.findById(id);

/**
 * Update kitchen by id
 * @param {ObjectId} kitchenId
 * @param {Object} updateBody
 * @returns {Promise<kitchen>}
 */
const updateKitchenById = async (kitchenId, updateBody) => {
  const kitchen = await getKitchenById(kitchenId);
  if (!kitchen) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kitchen not found');
  }

  Object.assign(kitchen, updateBody);
  await kitchen.save();
  return kitchen;
};

/**
 * Delete kitchen by id
 * @param {ObjectId} kitchenId
 * @returns {Promise<Kitchen>}
 */
const deleteKitchenById = async (kitchenId) => {
  const kitchen = await getKitchenById(kitchenId);
  if (!kitchen) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kitchen not found');
  }
  await kitchen.remove();
  return kitchen;
};

module.exports = {
  createKitchen,
  queryKitchens,
  getKitchenById,
  updateKitchenById,
  deleteKitchenById,
};
