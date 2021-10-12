const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { kitchenService } = require('../services');

const createKitchen = catchAsync(async (req, res) => {
  const kitchen = await kitchenService.createKitchen(req.body);
  res.status(httpStatus.CREATED).send(kitchen);
});

const getKitchens = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await kitchenService.queryKitchens(filter, options);
  res.send(result);
});

const getKitchen = catchAsync(async (req, res) => {
  const kitchen = await kitchenService.getKitchenById(req.params.kitchenId);
  if (!kitchen) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kitchen not found');
  }
  res.send(kitchen);
});

const updateKitchen = catchAsync(async (req, res) => {
  const kitchen = await kitchenService.updateKitchenById(req.params.kitchenId, req.body);
  res.send(kitchen);
});

const deleteKitchen = catchAsync(async (req, res) => {
  await kitchenService.deleteKitchenById(req.params.kitchenId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createKitchen,
  getKitchens,
  getKitchen,
  updateKitchen,
  deleteKitchen,
};
