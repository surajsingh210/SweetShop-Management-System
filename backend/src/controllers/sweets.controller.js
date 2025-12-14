import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from '../models/sweets.model.js';

export async function createSweet(req, res) {
  try {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || !price || !quantity)
      return res.status(400).json({ message: 'All fields required' });

    const sweet = await addSweet(name, category, price, quantity);
    res.status(201).json({ message: 'Sweet added', sweet });
  } catch (error) {
    console.error('createSweet:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getSweets(req, res) {
  try {
    const sweets = await getAllSweets();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sweets' });
  }
}

export async function search(req, res) {
  try {
    const sweets = await searchSweets(req.query);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Search failed' });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;
    const sweet = await updateSweet(id, name, category, price, quantity);
    res.json({ message: 'Sweet updated', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
}

export async function remove(req, res) {
  try {
    await deleteSweet(req.params.id);
    res.json({ message: 'Sweet deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
}

export async function purchase(req, res) {
  try {
    const sweet = await purchaseSweet(req.params.id);
    if (!sweet)
      return res.status(400).json({ message: 'Out of stock or invalid ID' });
    res.json({ message: 'Purchase successful', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Purchase failed' });
  }
}

export async function restock(req, res) {
  try {
    const { qty } = req.body;
    const sweet = await restockSweet(req.params.id, qty);
    res.json({ message: 'Restocked successfully', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Restock failed' });
  }
}
