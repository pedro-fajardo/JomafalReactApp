import React from 'react';
import { Typography, Alert, AlertTitle, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

/**
 * Component for displaying feedback messages (success, error, info, warning)
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Message type: 'success', 'error', 'info', or 'warning'
 * @param {string} props.message - Message text to display
 * @param {string} [props.title] - Optional title for the message
 * @param {boolean} [props.elevated] - Whether to add elevation/shadow
 */
const FeedbackMessage = ({ type = 'info', message, title, elevated = false }) => {
  if (!message) return null;

  const getAlertProps = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircleOutlineIcon />,
          severity: 'success',
          color: '#52B788',
          bgColor: 'rgba(82, 183, 136, 0.1)',
          title: title || 'Sucesso'
        };
      case 'error':
        return {
          icon: <ErrorOutlineIcon />,
          severity: 'error',
          color: '#E63946',
          bgColor: 'rgba(230, 57, 70, 0.1)',
          title: title || 'Erro'
        };
      case 'warning':
        return {
          icon: <WarningAmberIcon />,
          severity: 'warning',
          color: '#FF9F1C',
          bgColor: 'rgba(255, 159, 28, 0.1)',
          title: title || 'Atenção'
        };
      case 'info':
      default:
        return {
          icon: <InfoOutlinedIcon />,
          severity: 'info',
          color: '#5B85AA',
          bgColor: 'rgba(91, 133, 170, 0.1)',
          title: title || 'Informação'
        };
    }
  };

  const alertProps = getAlertProps();

  return (
    <Paper 
      elevation={elevated ? 2 : 0} 
      sx={{ 
        mb: 3, 
        overflow: 'hidden',
        borderRadius: 1,
        border: elevated ? 'none' : `1px solid ${alertProps.color}20`
      }}
    >
      <Alert 
        severity={alertProps.severity}
        icon={alertProps.icon}
        sx={{
          backgroundColor: alertProps.bgColor,
          color: alertProps.color,
          borderRadius: 1,
          '& .MuiAlert-icon': {
            color: alertProps.color,
            alignItems: 'center'
          },
          '& .MuiAlert-message': {
            padding: '8px 0'
          }
        }}
      >
        {title && <AlertTitle sx={{ fontWeight: 600, mb: 0.5 }}>{alertProps.title}</AlertTitle>}
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </Paper>
  );
};

export default FeedbackMessage;