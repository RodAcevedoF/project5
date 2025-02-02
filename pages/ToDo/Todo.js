// pages/ToDoList/ToDoList.js
export const Todo = () => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="page-container">
        <h2>Lista de Tareas</h2>
        <div id="todo-list"></div>
        <button id="add-todo" class="main-btn">Añadir Tarea</button>
      </div>
    `;
  
    // Aquí puedes agregar el código para cargar y manejar la lista de tareas
  
    return div;
  };
  