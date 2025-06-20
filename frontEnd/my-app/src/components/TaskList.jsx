import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'error';
      case 5: return 'error';
      default: return 'default';
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No tasks found
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Click "Add New Task" to create your first task
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Task Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow 
              key={task.id}
              sx={{
                backgroundColor: task.isOverdue ? '#ffebee' : 'inherit',
                '&:hover': {
                  backgroundColor: task.isOverdue ? '#ffcdd2' : '#f5f5f5'
                }
              }}
            >
              <TableCell>
                <Box display="flex" alignItems="center">
                  {task.isOverdue ? (
                    <Tooltip title="Overdue Task">
                      <WarningIcon color="error" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Pending Task">
                      <CheckCircleIcon color="success" />
                    </Tooltip>
                  )}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      ml: 1,
                      color: task.isOverdue ? 'error.main' : 'success.main',
                      fontWeight: 'medium'
                    }}
                  >
                    {task.isOverdue ? 'Overdue' : 'Pending'}
                  </Typography>
                </Box>
              </TableCell>
              
              <TableCell>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: task.isOverdue ? 'bold' : 'normal',
                    color: task.isOverdue ? 'error.dark' : 'inherit'
                  }}
                >
                  {task.name}
                </Typography>
              </TableCell>
              
              <TableCell>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: task.isOverdue ? 'error.main' : 'inherit',
                    fontWeight: task.isOverdue ? 'medium' : 'normal'
                  }}
                >
                  {formatDate(task.dueDate)}
                </Typography>
              </TableCell>
              
              <TableCell>
                <Chip
                  label={getPriorityLabel(task.priority)}
                  color={getPriorityColor(task.priority)}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              
              <TableCell align="center">
                <Box>
                  <Tooltip title="Edit Task">
                    <IconButton
                      onClick={() => onEdit(task)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <IconButton
                      onClick={() => onDelete(task.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;