// pages/VideoList/VideoList.js
export const Videos = () => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="page-container">
        <h2>Lista de Videos</h2>
        <div id="video-list"></div>
        <button id="add-video" class="main-btn">Añadir Video</button>
      </div>
    `;
  
    // Aquí puedes agregar el código para cargar y manejar la lista de videos
  
    return div;
  };
  