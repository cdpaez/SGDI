// bloque encargado de abrir el modal
// Selección de elementos
const botonAbrirModal = document.getElementById('abrir-modal');
const modal = document.getElementById('modal-agregar-producto');
const botonesCerrar = document.querySelectorAll('.cerrar-modal');

// Abrir el modal
botonAbrirModal.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Cerrar el modal desde el botón "Cancelar"
botonesCerrar.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});

// Cerrar el modal si se hace clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});