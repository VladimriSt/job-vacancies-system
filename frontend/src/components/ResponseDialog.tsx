import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface ResponseDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;  // Изменили onRespond на onSubmit
}

const ResponseDialog: React.FC<ResponseDialogProps> = ({ open, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError('Введите корректный email');
      return;
    }
    setError('');
    await onSubmit(email);  // Используем onSubmit вместо onRespond
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Оставить отклик</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit}>Отправить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponseDialog;