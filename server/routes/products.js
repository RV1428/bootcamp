const express = require('express');
const Product = require('../models/Product');
const { validateProduct, validateReview } = require('../validators/productValidators');
const router = express.Router();

router.post('/', validateProduct, async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    const newProduct = new Product({ name, description, image, reviews: [] });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/review', validateReview, async (req, res, next) => {
  try {
    const { user, rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    product.reviews.push({ user, rating, comment });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
