const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const kitchenSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
kitchenSchema.plugin(toJSON);
kitchenSchema.plugin(paginate);
/**
 * @typedef Items
 */
const Items = mongoose.model('Kitchens', kitchenSchema);

module.exports = Items;
