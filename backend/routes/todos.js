const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Validation helper function
const validateTodo = (title) => {
  const errors = [];
  
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.trim().length > 255) {
    errors.push('Title must be less than 255 characters');
  }
  
  return errors;
};

// GET /todos - Retrieve all todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM todos ORDER BY created_at DESC');
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch todos',
      message: error.message
    });
  }
});

// GET /todos/:id - Retrieve a single todo by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid todo ID'
      });
    }
    
    const [rows] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch todo',
      message: error.message
    });
  }
});

// POST /todos - Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, completed = false } = req.body;
    
    // Validate input
    const validationErrors = validateTodo(title);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    // Insert new todo
    const [result] = await pool.execute(
      'INSERT INTO todos (title, completed) VALUES (?, ?)',
      [title.trim(), Boolean(completed)]
    );
    
    // Fetch the created todo
    const [newTodo] = await pool.execute('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo[0]
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create todo',
      message: error.message
    });
  }
});

// PUT /todos/:id - Update an existing todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid todo ID'
      });
    }
    
    // Check if todo exists
    const [existingTodo] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    if (existingTodo.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    // Prepare update fields
    const updateFields = [];
    const updateValues = [];
    
    if (title !== undefined) {
      const validationErrors = validateTodo(title);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validationErrors
        });
      }
      updateFields.push('title = ?');
      updateValues.push(title.trim());
    }
    
    if (completed !== undefined) {
      updateFields.push('completed = ?');
      updateValues.push(Boolean(completed));
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      });
    }
    
    updateValues.push(id);
    
    // Update todo
    await pool.execute(
      `UPDATE todos SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    // Fetch updated todo
    const [updatedTodo] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo[0]
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update todo',
      message: error.message
    });
  }
});

// DELETE /todos/:id - Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid todo ID'
      });
    }
    
    // Check if todo exists
    const [existingTodo] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    if (existingTodo.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    // Delete todo
    await pool.execute('DELETE FROM todos WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Todo deleted successfully',
      data: existingTodo[0]
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete todo',
      message: error.message
    });
  }
});

module.exports = router;
