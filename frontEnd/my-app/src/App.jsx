import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { taskService } from './services/taskService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks(filter === 'all' ? null : filter);
      // Ensure we always set an array
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks([]); // Set empty array on error
      showSnackbar(error.message || 'Error loading tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      await loadTasks();
      setShowForm(false);
      showSnackbar('Task created successfully', 'success');
    } catch (error) {
      showSnackbar('Error creating task', 'error');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await taskService.updateTask(id, taskData);
      await loadTasks();
      setEditingTask(null);
      setShowForm(false);
      showSnackbar('Task updated successfully', 'success');
    } catch (error) {
      showSnackbar('Error updating task', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      await loadTasks();
      showSnackbar('Task deleted successfully', 'success');
    } catch (error) {
      showSnackbar('Error deleting task', 'error');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
              MiCuento TO-DO List
            </Typography>
            
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setShowForm(true)}
                  size="large"
                >
                  Add New Task
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Filter Tasks</InputLabel>
                  <Select
                    value={filter}
                    label="Filter Tasks"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Tasks</MenuItem>
                    <MenuItem value="pending">Pending Tasks</MenuItem>
                    <MenuItem value="overdue">Overdue Tasks</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />

          {showForm && (
            <TaskForm
              open={showForm}
              task={editingTask}
              onClose={handleCloseForm}
              onSubmit={editingTask ? 
                (data) => handleUpdateTask(editingTask.id, data) : 
                handleCreateTask
              }
            />
          )}

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;