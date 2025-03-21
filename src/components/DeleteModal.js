import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteModal({ showDeleteModal, handleCloseDeleteModal, handleDelete, isLoading = false }) {
  return (
    <Dialog
      open={showDeleteModal || false}
      onClose={handleCloseDeleteModal}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          maxWidth: '450px',
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          pt: 4,
          pb: 1,
          fontWeight: 600,
          color: '#2E5077',
        }}
      >
        Confirmar a eliminação
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center', p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              backgroundColor: 'rgba(230, 57, 70, 0.1)',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <DeleteIcon sx={{ fontSize: 40, color: '#E63946' }} />
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Tem certeza que deseja eliminar este equipamento?
        </Typography>
        <Typography variant="body2" color="error" sx={{ mt: 2, fontWeight: 500 }}>
          Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleCloseDeleteModal}
          variant="outlined"
          sx={{
            borderColor: '#5B85AA',
            color: '#5B85AA',
            fontWeight: 500,
            '&:hover': {
              borderColor: '#2E5077',
              backgroundColor: 'rgba(91, 133, 170, 0.1)',
            },
            px: 3
          }}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{
            backgroundColor: '#E63946',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
            fontWeight: 500,
            px: 3
          }}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
        >
          {isLoading ? 'A excluir...' : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;