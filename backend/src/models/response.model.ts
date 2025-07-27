import pool from '../config/db';

class ResponseModel {
  static async create(userEmail: string, vacancyId: number): Promise<any> {
    // Проверка типов данных
    if (typeof vacancyId !== 'number' || isNaN(vacancyId)) {
      throw new Error('Invalid vacancyId');
    }

    // Параметризованный запрос
    const query = `
      INSERT INTO responses (userEmail, vacancyId)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [userEmail, vacancyId];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
}

export default ResponseModel;