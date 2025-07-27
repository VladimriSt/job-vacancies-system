import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VacancyCard from './components/VacancyCard';
import { useApi } from './hooks/useApi';
import { Vacancy } from './types/types';

interface CustomGridProps {
  item: boolean;
  xs: number;
  sm: number;
  md: number;
  component: React.ElementType;
  children: React.ReactNode;
  key?: string | number;
}

const CustomGrid: React.FC<CustomGridProps> = ({ children, ...props }) => (
  <Grid {...props}>{children}</Grid>
);


const App: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const { listVacancies, createResponse } = useApi();

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await listVacancies();
        setVacancies(data.items);
      } catch (error) {
        toast.error('Failed to load vacancies');
      }
    };

    fetchVacancies();
  }, [listVacancies]);

  const handleRespond = async (vacancyId: number, email: string) => {
    try {
      await createResponse({ userEmail: email, vacancyId });
      toast.success('Response submitted successfully!');
      
      const data = await listVacancies();
      setVacancies(data.items);
    } catch (error) {
      toast.error('Failed to submit response');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Job Vacancies
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total vacancies: {vacancies.length}
      </Typography>
      
    <Grid container spacing={2}>
    {vacancies.map((vacancy) => (
        <CustomGrid
        key={vacancy.id}
        item={true}
        xs={12}
        sm={6}
        md={4}
        component="div"
        >
        <VacancyCard 
            vacancy={vacancy} 
            onRespond={handleRespond}
        />
        </CustomGrid>
    ))}
    </Grid>

      <ToastContainer position="bottom-right" />
    </Container>
  );
};

export default App;