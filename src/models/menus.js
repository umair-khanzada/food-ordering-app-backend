const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const menusSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    availableDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
menusSchema.plugin(toJSON);
menusSchema.plugin(paginate);
/**
 * @typedef Menus
 */
const Menus = mongoose.model('Menus', menusSchema);

module.exports = Menus;
