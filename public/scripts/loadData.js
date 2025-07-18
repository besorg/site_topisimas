window.addEventListener('DOMContentLoaded', () => {
  fetch('https://docs.google.com/spreadsheets/d/1oSXRJkVeD3napDd9bltITSA4snw4uqOgXzLtfav05yo/gviz/tq?tqx=out:csv')
    .then(res => res.text())
    .then(csvText => {
      const parsed = Papa.parse(csvText, { header: true });
      const rows = parsed.data;

      const productos = rows.filter(row => row.nombre && row.imagen).map(row => ({
        nombre: row.nombre,
        descripcion: row.descripcion,
        imagen: row.imagen,
        precio: row.precio
      }));

      const whatsapp = '5491132776974';

      const resenias = rows
        .filter(row => row.cita && row.autor)
        .map(row => ({
          cita: row.cita.trim(),
          autor: row.autor.trim()
        }));

      window.dynamicProducts = productos;
      window.dynamicWhatsapp = whatsapp;

      const list = document.getElementById('burger-list');
      list.innerHTML = productos.map((producto, index) => `
        <div class="burger-card" onclick="openModalFromList(${index})">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p class="price">$${producto.precio}</p>
        </div>
      `).join('');

      const reviewsContainer = document.getElementById('reviews-container');
      reviewsContainer.innerHTML = resenias.map(r => `
        <div class="review">
          <p>“${r.cita}”</p>
          <span>- ${r.autor}</span>
        </div>
      `).join('');
    });
});
