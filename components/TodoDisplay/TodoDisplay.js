import './TodoDisplay.css';
import { deleteTodo } from '../../api/ToDoApi';
import { loadTodos, loadUpcomingDeadlines } from '../MainAside/MainAside';

export const TodoDisplay = (todo) => {
  const card = document.createElement('div');
  card.classList.add('todo-display-card');

  card.innerHTML = `
    <h3>${todo.title}</h3>
    <p>${todo.description || 'No description available'}</p>
    <p>Priority: ${todo.priority}</p>
    <p>Deadline: ${todo.deadline ? new Date(todo.deadline).toLocaleString() : 'No deadline'}</p>
    <div class="actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      <button class="close-btn">Close</button>
    </div>
  `;

  card.querySelector('.edit-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('loadTodoIntoEditor', { detail: todo }));
    card.remove()
  });

  card.querySelector('.delete-btn').addEventListener('click', async () => {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      const result = await deleteTodo(todo.id);
      if (result.success) {
        card.remove();
        loadTodos(10, 0);
        loadUpcomingDeadlines();
        const aside = document.querySelector('aside');
        if (aside && typeof aside.calendarUpdate === 'function') {
          aside.calendarUpdate();
        }
      } else {
        alert(result.error || 'Error al eliminar la tarea');
      }
    }
  });

  card.querySelector('.close-btn').addEventListener('click', () => {
    card.remove();
  });

  return card;
};
