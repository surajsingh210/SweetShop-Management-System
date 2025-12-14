// src/server.js
import app from './app.js';
import pool from './db.js';
import 'dotenv/config';

const port = process.env.PORT || 5000;

(async () => {
  try {
    // Test the connection once
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to Neon PostgreSQL');

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
})();
