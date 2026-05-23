import express from 'express';

const router = express.Router();

import {
    getProducts,
    getProductById,
} from '../controllers/productController.js';

// Get all products
router.route('/').get(getProducts);

// Get single product
router.route('/:id').get(getProductById);

export default router;