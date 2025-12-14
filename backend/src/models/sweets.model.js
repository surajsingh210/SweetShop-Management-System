import pool from '../db.js';

export async function addSweet(name, category, price, quantity) {
  const result = await pool.query(
    `INSERT INTO sweets (name, category, price, quantity)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, category, price, quantity]
  );
  return result.rows[0];
}

export async function getAllSweets() {
  const result = await pool.query('SELECT * FROM sweets ORDER BY id ASC');
  return result.rows;
}

export async function searchSweets({ name, category, minPrice, maxPrice }) {
  let query = 'SELECT * FROM sweets WHERE 1=1';
  const params = [];

  if (name) {
    params.push(`%${name}%`);
    query += ` AND name ILIKE $${params.length}`;
  }

  if (category) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }

  if (minPrice) {
    params.push(minPrice);
    query += ` AND price >= $${params.length}`;
  }

  if (maxPrice) {
    params.push(maxPrice);
    query += ` AND price <= $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
}

export async function updateSweet(id, name, category, price, quantity) {
  const result = await pool.query(
    `UPDATE sweets SET name=$1, category=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *`,
    [name, category, price, quantity, id]
  );
  return result.rows[0];
}

export async function deleteSweet(id) {
  await pool.query('DELETE FROM sweets WHERE id=$1', [id]);
  return true;
}

export async function purchaseSweet(id) {
  const result = await pool.query(
    `UPDATE sweets SET quantity = quantity - 1 WHERE id=$1 AND quantity > 0 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

export async function restockSweet(id, qty) {
  const result = await pool.query(
    `UPDATE sweets SET quantity = quantity + $1 WHERE id=$2 RETURNING *`,
    [qty, id]
  );
  return result.rows[0];
}
