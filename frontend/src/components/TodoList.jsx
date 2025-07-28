import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="todo-list">
        <div className="loading">Chargement des tâches...</div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <h2>Vos Tâches</h2>
        <div className="empty-state">
          <h3>Aucune tâche pour le moment !</h3>
          <p>Ajoutez votre première tâche ci-dessus pour commencer.</p>
        </div>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list">
      <h2>Vos Tâches</h2>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          loading={loading}
        />
      ))}
      <div className="stats">
        <span>Total: {totalCount}</span>
        <span>Terminées: {completedCount}</span>
        <span>Restantes: {totalCount - completedCount}</span>
      </div>
    </div>
  );
};

export default TodoList;
