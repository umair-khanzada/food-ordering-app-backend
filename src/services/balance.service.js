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
  const balance = await Balance.findOne(query);
  let amount = 0;
  const { amount: orderAmount } = balanceBody;
  if (balance) {
    const { amount: actualAmount } = balance;
    amount = actualAmount - orderAmount;
  } else {
    amount -= orderAmount;
  }

  return Balance.findOneAndUpdate(query, { ...balanceBody, amount }, { upsert: true });
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
const queryBalances = async () => {
  const response = await (await Balance.find().populate('vendorId', 'name').populate('userId', 'name')).reverse();
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
const updateBalanceById = async (balanceBody) => {
  const { userId, vendorId } = balanceBody;
  const query = {
    userId,
    vendorId,
  };

  return Balance.findOneAndUpdate(query, balanceBody, { upsert: true });
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

/**
 * Get balance by user id
 * @param {ObjectId} balanceId
 * @returns {Promise<Balance>}
 */
const getBalanceByUserId = async (userId) => {
  return Balance.find({ userId }).populate('vendorId', 'name');
};

/**
 * Get balance by vendor id
 * @param {ObjectId} balanceId
 * @returns {Promise<Balance>}
 */
const getBalanceByVendorId = async (vendorId) => {
  return Balance.find({ vendorId }).populate('vendorId', 'name').populate('userId', 'name');
};

module.exports = {
  createAndEditBalance,
  queryBalances,
  getBalanceById,
  updateBalanceById,
  deleteBalanceById,
  getBalanceByUserId,
  getBalanceByVendorId,
};
