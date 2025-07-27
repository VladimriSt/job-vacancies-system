import React, { useState } from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';
import ResponseDialog from './ResponseDialog';
import { Vacancy } from '../types/types';

interface VacancyCardProps {
  vacancy: Vacancy;
  onRespond: (vacancyId: number, email: string) => Promise<void>;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onRespond }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (email: string) => {
    await onRespond(vacancy.id, email);
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {vacancy.title}
          </Typography>
          <Typography paragraph>
            {vacancy.description}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Количество откликов: <strong>{vacancy.responses}</strong>
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setOpen(true)}
          >
            Откликнуться
          </Button>
        </CardContent>
      </Card>
      
      <ResponseDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default VacancyCard;