const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const balanceSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
balanceSchema.plugin(toJSON);
balanceSchema.plugin(paginate);
/**
 * @typedef Balances
 */
const Balances = mongoose.model('Balances', balanceSchema);

module.exports = Balances;
