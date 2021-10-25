const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const categoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // description: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categoriesSchema.plugin(toJSON);
categoriesSchema.plugin(paginate);

/**
 * @typedef User
 */
const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
