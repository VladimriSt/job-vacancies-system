export interface Vacancy {
  id: number;
  title: string;
  description: string;
  logo: string | null;
  responses: number;
}

export interface CreateResponseData {
  userEmail: string;
  vacancyId: number;
}