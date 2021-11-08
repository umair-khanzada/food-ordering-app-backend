const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { balanceService } = require('../services');

const createBalance = catchAsync(async (req, res) => {
  const balance = await balanceService.createAndEditBalance(req.body);
  res.status(httpStatus.CREATED).send(balance);
});

const getBalances = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await balanceService.queryBalances(filter, options);
  res.send(result);
});

const getBalance = catchAsync(async (req, res) => {
  const balance = await balanceService.getBalanceById(req.params.balanceId);
  if (!balance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Balance not found');
  }
  res.send(balance);
});

const updateBalance = catchAsync(async (req, res) => {
  const balance = await balanceService.updateBalanceById(req.body);
  res.send(balance);
});

const deleteBalance = catchAsync(async (req, res) => {
  await balanceService.deleteBalanceById(req.params.balanceId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getBalanceByUserId = catchAsync(async (req, res) => {
  const balancesByUser = await balanceService.getBalanceByUserId(req.params.userId);
  res.send(balancesByUser);
});

const getBalanceByVendorId = catchAsync(async (req, res) => {
  const balancesByVendor = await balanceService.getBalanceByVendorId(req.params.vendorId);
  res.send(balancesByVendor);
});

module.exports = {
  createBalance,
  getBalances,
  getBalance,
  updateBalance,
  deleteBalance,
  getBalanceByUserId,
  getBalanceByVendorId,
};
