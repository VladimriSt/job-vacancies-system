import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

export const useApi = () => {
  const listVacancies = async () => {
    const response = await axios.get(`${API_BASE}/vacancies`);
    console.log('Vacancies data:', response.data);
    return response.data;
  };

  const createResponse = async (data: { userEmail: string; vacancyId: number }) => {
    await axios.post(`${API_BASE}/responses`, data);
  };

  return { listVacancies, createResponse };
};