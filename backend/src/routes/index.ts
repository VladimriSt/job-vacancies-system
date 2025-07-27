import { Router } from 'express';
import VacanciesController from '../controllers/vacancies.controller';
import ResponsesController from '../controllers/responses.controller';

const router = Router();

router.get('/vacancies', VacanciesController.listVacancies);
router.post('/responses', ResponsesController.createResponse);

export default router;