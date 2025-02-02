// pages/BookList/BookList.js
export const Books = () => {
    const main = document.querySelector("main");
    main.innerHTML = `
      <div class="page-container">
        <h2>Lista de Libros</h2>
        <div id="book-list"></div>
        <button id="add-book" class="main-btn">Añadir Libro</button>
      </div>
    `;
  
    // Aquí puedes agregar el código para cargar y manejar la lista de libros
  
    return main;
  };
  