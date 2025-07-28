import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, loading }) => {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(todo.id, !todo.completed);
    } catch (error) {
      console.error('Error toggling todo:', error);
      alert('Échec de la mise à jour de la tâche. Veuillez réessayer.');
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setIsDeleting(true);
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Échec de la suppression de la tâche. Veuillez réessayer.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={loading || isToggling || isDeleting}
        />
        <div>
          <div className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Créé: {formatDate(todo.created_at)}
            {todo.updated_at !== todo.created_at && (
              <span> • Modifié: {formatDate(todo.updated_at)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button
          className={`btn ${todo.completed ? 'btn-success' : 'btn-success'}`}
          onClick={handleToggle}
          disabled={loading || isToggling || isDeleting}
          title={todo.completed ? 'Marquer comme incomplète' : 'Marquer comme complète'}
        >
          {isToggling ? '...' : (todo.completed ? '✓' : '○')}
        </button>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={loading || isToggling || isDeleting}
          title="Supprimer la tâche"
        >
          {isDeleting ? '...' : '✕'}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
