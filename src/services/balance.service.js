const httpStatus = require('http-status');
const { Balance } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Balance
 * @param {Object} balanceBody
 * @returns {Promise<balance>}
 */
const createAndEditBalance = async (balanceBody) => {
  const { userId, vendorId } = balanceBody;
  const query = {
    userId,
    vendorId,
  };

  return Balance.findOneAndUpdate(query, balanceBody, { upsert: true });
};

/**
 * Query for Balances
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBalances = async (filter, options) => {
  const response = await Balance.paginate(filter, options);
  return response;
};

/**
 * Get balance by id
 * @param {ObjectId} id
 * @returns {Promise<balance>}
 */
const getBalanceById = async (id) => Balance.findById(id);

/**
 * Update balance by id
 * @param {ObjectId} balanceId
 * @param {Object} updateBody
 * @returns {Promise<balance>}
 */
const updateBalanceById = async (balanceId, updateBody) => {
  const balance = await getBalanceById(balanceId);
  if (!balance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Balance not found');
  }

  Object.assign(balance, updateBody);
  await balance.save();
  return balance;
};

/**
 * Delete balance by id
 * @param {ObjectId} balanceId
 * @returns {Promise<Balance>}
 */
const deleteBalanceById = async (balanceId) => {
  const balance = await getBalanceById(balanceId);
  if (!balance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Balance not found');
  }
  await balance.remove();
  return balance;
};

module.exports = {
  createAndEditBalance,
  queryBalances,
  getBalanceById,
  updateBalanceById,
  deleteBalanceById,
};
