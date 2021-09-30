const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const orderSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    items: {
      type: [Schema.Types.ObjectId],
      ref: 'Items',
    },
    status: {
      type: String,
      enum: ['pending', 'recieved'],
      default: 'pending',
    },
    amount: {
      type: Number,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);
/**
 * @typedef Orders
 */
const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
