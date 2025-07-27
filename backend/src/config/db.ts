import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Vacancies_DB',
  password: '3213',
  port: 5432,
});

export default pool;