import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingComponentProps {
  size?: string | number;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ size }) => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <CircularProgress size={size || "8rem"} />
  </Box>
);

export default LoadingComponent;
