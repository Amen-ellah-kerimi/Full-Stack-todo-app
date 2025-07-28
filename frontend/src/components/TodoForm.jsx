import React, { useState } from 'react';

const TodoForm = ({ onAddTodo, loading }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Veuillez entrer un titre de tâche');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAddTodo({ title: title.trim() });
      setTitle(''); // Clear form on success
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Échec de l\'ajout de la tâche. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="todo-form">
      <h2>Ajouter une Nouvelle Tâche</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre de la tâche..."
            disabled={loading || isSubmitting}
            maxLength={255}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || isSubmitting || !title.trim()}
          >
            {isSubmitting ? 'Ajout...' : 'Ajouter Tâche'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
