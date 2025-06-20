import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const TaskForm = ({ open, task, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dueDate: null,
    priority: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || '',
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
        priority: task.priority || 1,
      });
    } else {
      setFormData({
        name: '',
        dueDate: null,
        priority: 1,
      });
    }
    setErrors({});
  }, [task, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Task name is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.priority < 1 || formData.priority > 5) {
      newErrors.priority = 'Priority must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if dueDate exists before formatting
    if (!formData.dueDate) {
      setErrors(prev => ({
        ...prev,
        dueDate: 'Due date is required'
      }));
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      dueDate: formData.dueDate.format('YYYY-MM-DD'),
      priority: formData.priority,
    };

    onSubmit(submitData);
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleDateChange = (newDate) => {
    setFormData(prev => ({
      ...prev,
      dueDate: newDate
    }));
    
    if (errors.dueDate) {
      setErrors(prev => ({
        ...prev,
        dueDate: undefined
      }));
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1: return 'Very Low';
      case 2: return 'Low';
      case 3: return 'Medium';
      case 4: return 'High';
      case 5: return 'Very High';
      default: return 'Unknown';
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          elevation: 8
        }}
      >
        <DialogTitle sx={{ backgroundColor: '#f5f5f5', color: 'primary.main' }}>
          <Typography variant="h6" component="div">
            {task ? 'Edit Task' : 'Add New Task'}
          </Typography>
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Task Name"
                value={formData.name}
                onChange={handleChange('name')}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                required
                autoFocus
                variant="outlined"
              />

              <DatePicker
                label="Due Date"
                value={formData.dueDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    error={!!errors.dueDate}
                    helperText={errors.dueDate}
                  />
                )}
                minDate={dayjs()}
              />

              <FormControl fullWidth required>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={handleChange('priority')}
                  error={!!errors.priority}
                >
                  {[1, 2, 3, 4, 5].map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority} - {getPriorityLabel(priority)}
                    </MenuItem>
                  ))}
                </Select>
                {errors.priority && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                    {errors.priority}
                  </Typography>
                )}
              </FormControl>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
            <Button 
              onClick={onClose} 
              color="secondary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              color="primary"
            >
              {task ? 'Update Task' : 'Create Task'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
};

export default TaskForm;