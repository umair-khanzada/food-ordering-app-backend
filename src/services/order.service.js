const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');
const { createAndEditBalance } = require('./balance.service');

/**
 * Create a Order
 * @param {Object} orderBody
 * @returns {Promise<order>}
 */
const createOrder = async (orderBody) => {
  return Order.create(orderBody);
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async () => {
  const response = await Order.find().populate('vendorId', 'name').populate('userId', 'name').sort({ _id: 'desc' });
  return response;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<order>}
 */
const getOrderById = async (id) => Order.findById(id);

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  Object.assign(order, updateBody);
  await order.save();
  if (order.status === 'received') {
    const { amount } = updateBody;
    const { userId, vendorId } = order;
    await createAndEditBalance({ userId, vendorId, amount });
  }
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

/**
 * find orders by vendor id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const getOrderByVendorId = async (vendorId) => {
  return Order.find({ vendorId }).populate('vendorId', 'name').populate('userId', 'name').sort({ _id: 'desc' });
};

const getOrderByUserId = async (userId) => {
  return Order.find({ userId }).populate('vendorId', 'name').populate('userId', 'name').sort({ _id: 'desc' });
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderByVendorId,
  getOrderByUserId,
};
