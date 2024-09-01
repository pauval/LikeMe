import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error de conexión a la BD', err);
  } else {
    console.log('BD Conectada:', res.rows[0]);
  }
});
