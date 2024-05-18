const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  reviews: [reviewSchema],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
