const { Message } = require('../models');

/**
 * Create a menu
 * @param {Object} menuBody
 * @returns {Promise<User>}
 */
const createMessage = async (messageBody) => {
  return Message.create(messageBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getMessageById = async (id) => {
  return Message.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */

module.exports = {
  createMessage,
  getMessageById,
};
