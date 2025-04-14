const inputBusquedaPrd = document.getElementById('buscador-productos');
const filasProductos = document.querySelectorAll('.tabla-productos tbody tr');

inputBusquedaPrd.addEventListener('input', () => {
  const texto = inputBusquedaPrd.value.toLowerCase();

  filasProductos.forEach(fila => {
    const nombre = fila.cells[1].textContent.toLowerCase(); // Columna 1 = Nombre
    if (nombre.includes(texto)) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
});