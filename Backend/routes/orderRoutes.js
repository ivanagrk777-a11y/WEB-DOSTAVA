import express from 'express';

const router = express.Router();

import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from '../controllers/orderController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// Create new order & get all orders
router
    .route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);

// Get logged in user orders
router.route('/myorders').get(protect, getMyOrders);

// Get order by ID
router.route('/:id').get(protect, admin, getOrderById);

// Update order to paid
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Update order to delivered
router.route('/:id/deliver').put(
    protect,
    admin,
    updateOrderToDelivered
);

export default router;