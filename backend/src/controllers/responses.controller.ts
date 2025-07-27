import { Request, Response } from 'express';
import ResponseModel from '../models/response.model';

class ResponsesController {
  static async createResponse(req: Request, res: Response) {
    const { userEmail, vacancyId } = req.body;

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ error: 'Некорректный email' });
    }

    // Проверка vacancyId
    if (!vacancyId || isNaN(Number(vacancyId))) {
      return res.status(400).json({ error: 'Некорректный ID вакансии' });
    }

    try {
      const newResponse = await ResponseModel.create(userEmail, Number(vacancyId));
      res.status(201).json(newResponse);
    } catch (error) {
      console.error('Error creating response:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}

export default ResponsesController;