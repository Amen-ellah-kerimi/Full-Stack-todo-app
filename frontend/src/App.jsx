import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { todoAPI } from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoAPI.getAllTodos();
      setTodos(response.data || []);
    } catch (error) {
      console.error('Error loading todos:', error);
      setError('Failed to load todos. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      setError(null);
      const response = await todoAPI.createTodo(todoData);
      
      if (response.success && response.data) {
        // Add new todo to the beginning of the list
        setTodos(prevTodos => [response.data, ...prevTodos]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo. Please try again.');
      throw error; // Re-throw to handle in TodoForm
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      setError(null);
      const response = await todoAPI.toggleTodo(id, completed);
      
      if (response.success && response.data) {
        // Update the todo in the list
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === id ? response.data : todo
          )
        );
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
      setError('Failed to update todo. Please try again.');
      throw error; // Re-throw to handle in TodoItem
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setError(null);
      const response = await todoAPI.deleteTodo(id);
      
      if (response.success) {
        // Remove todo from the list
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
      throw error; // Re-throw to handle in TodoItem
    }
  };

  const handleRetry = () => {
    loadTodos();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Application Todo</h1>
        <p>Une application de liste de tâches simple et élégante</p>
      </div>

      {error && (
        <div className="error">
          <strong>Erreur:</strong> {error}
          <button
            onClick={handleRetry}
            className="ml-3 px-3 py-1 bg-transparent border border-red-800 text-red-800 rounded cursor-pointer hover:bg-red-50 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}

      <TodoForm 
        onAddTodo={handleAddTodo} 
        loading={loading} 
      />

      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        loading={loading}
      />

      {!loading && todos.length === 0 && !error && (
        <div className="text-center mt-5 text-gray-500">
          <p>🎉 Vous êtes à jour ! Ajoutez une nouvelle tâche pour commencer.</p>
        </div>
      )}
    </div>
  );
}

export default App;
