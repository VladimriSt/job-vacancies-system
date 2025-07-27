import { Request, Response } from 'express';
import VacancyModel from '../models/vacancy.model';

class VacanciesController {
  static async listVacancies(req: Request, res: Response) {
    try {
      const vacancies = await VacancyModel.getAll();
      
      const vacanciesWithResponses = await Promise.all(
        vacancies.map(async (vacancy) => {
          const responsesCount = await VacancyModel.getResponsesCount(vacancy.id);
          return {
            ...vacancy,
            responses: responsesCount,
            logo: vacancy.logo?.toString('base64') || null
          };
        })
      );

      res.json({
        items: vacanciesWithResponses,
        total: vacancies.length
      });
    } catch (error) {
      console.error('Error fetching vacancies:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default VacanciesController;