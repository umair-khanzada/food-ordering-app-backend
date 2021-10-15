const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const itemsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    price: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    // isAvailable: {
    //   type: Boolean,
    //   default: true,
    // },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
    },

    availableDate: {
      type: Date,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
itemsSchema.plugin(toJSON);
itemsSchema.plugin(paginate);
/**
 * @typedef Items
 */
const Items = mongoose.model('Items', itemsSchema);

module.exports = Items;
