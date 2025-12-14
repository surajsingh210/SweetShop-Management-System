import express from 'express';
import {
  createSweet,
  getSweets,
  search,
  update,
  remove,
  purchase,
  restock
} from '../controllers/sweets.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', verifyToken, requireAdmin, createSweet);
router.get('/', verifyToken, getSweets);
router.get('/search', verifyToken, search);
router.put('/:id', verifyToken, requireAdmin, update);
router.delete('/:id', verifyToken, requireAdmin, remove);

// Inventory operations
router.post('/:id/purchase', verifyToken, purchase);
router.post('/:id/restock', verifyToken, requireAdmin, restock);

export default router;
