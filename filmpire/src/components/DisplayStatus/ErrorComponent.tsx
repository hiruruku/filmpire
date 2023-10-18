// ErrorComponent.tsx
import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface ErrorComponentProps {
  message?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <Link to="/">{message || "Something has gone wrong - Go back"}</Link>
  </Box>
);

export default ErrorComponent;