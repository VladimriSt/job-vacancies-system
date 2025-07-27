import pool from '../config/db';

interface Vacancy {
  id: number;
  title: string;
  description: string;
  logo: Buffer;
}

class VacancyModel {
  static async getAll(): Promise<Vacancy[]> {
    const { rows } = await pool.query('SELECT * FROM vacancies');
    return rows;
  }

  static async getResponsesCount(vacancyId: number): Promise<number> {
    const { rows } = await pool.query(
      'SELECT COUNT(*)::int as count FROM responses WHERE vacancyId = $1',
      [vacancyId]
    );
    return rows[0].count;
  }
}

export default VacancyModel;