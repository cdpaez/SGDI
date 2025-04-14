// === UI del Modal ===
const btnAbrirUsuario = document.getElementById('abrir-modal-usuario');
const modalUsuario = document.getElementById('modal-agregar-usuario');
const btnsCerrarModal = modalUsuario.querySelectorAll('.cerrar-modal');
btnAbrirUsuario.addEventListener('click', () => modalUsuario.style.display = 'flex');
btnsCerrarModal.forEach(btn => btn.addEventListener('click', () => modalUsuario.style.display = 'none'));
window.addEventListener('click', (e) => {
  if (e.target === modalUsuario) modalUsuario.style.display = 'none';
});

// === Lógica de formulario ===
const tablaUsuarios = document.querySelector('.tabla-usuarios tbody');
const formularioUsuario = document.getElementById('formulario-usuario');
let filaEditando = null;

tablaUsuarios.addEventListener('click', function (e) {
  const btn = e.target;

  if (btn.classList.contains('eliminar-usuario')) {
    const confirmar = confirm('¿Estás seguro de eliminar este usuario?');
    if (confirmar) btn.closest('tr').remove();
  }

  if (btn.classList.contains('editar-usuario')) {
    filaEditando = btn.closest('tr');
    const celdas = filaEditando.querySelectorAll('td');
    const nombre = celdas[1].textContent;
    const correo = celdas[2].textContent;
    const rol = celdas[3].textContent;

    formularioUsuario.nombre.value = nombre;
    formularioUsuario.correo.value = correo;
    formularioUsuario.password.value = '';
    formularioUsuario.rol.value = rol;

    formularioUsuario.setAttribute('data-editando', 'true');
    modalUsuario.style.display = 'flex';
  }
});

formularioUsuario.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = formularioUsuario.nombre.value.trim();
  const correo = formularioUsuario.correo.value.trim();
  const password = formularioUsuario.password.value;
  const rol = formularioUsuario.rol.value;
  const editando = formularioUsuario.getAttribute('data-editando') === 'true';

  if (!nombre || !correo || (!editando && !password) || !rol) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (editando && filaEditando) {
    const celdas = filaEditando.querySelectorAll('td');
    celdas[1].textContent = nombre;
    celdas[2].textContent = correo;
    celdas[3].textContent = rol;
  } else {
    const id = 'U' + String(document.querySelectorAll('.tabla-usuarios tbody tr').length + 1).padStart(3, '0');
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${id}</td>
      <td>${nombre}</td>
      <td>${correo}</td>
      <td>${rol}</td>
      <td><span class="estado-usuario activo" onclick="toggleEstado(this)">Activo</span></td>
      <td>
        <button class="editar-usuario">✏️</button>
        <button class="eliminar-usuario">🗑️</button>
      </td>
    `;
    tablaUsuarios.appendChild(fila);
  }

  formularioUsuario.reset();
  formularioUsuario.setAttribute('data-editando', 'false');
  filaEditando = null;
  modalUsuario.style.display = 'none';
});

window.toggleEstado = function (elemento) {
  if (elemento.classList.contains("activo")) {
    elemento.classList.remove("activo");
    elemento.classList.add("inactivo");
    elemento.textContent = "Inactivo";
  } else {
    elemento.classList.remove("inactivo");
    elemento.classList.add("activo");
    elemento.textContent = "Activo";
  }
};

// Esta función está vacía ya que no hay base de datos
function cargarUsuarios() {
  // Aquí podrías cargar usuarios desde localStorage si lo deseas.
}
const buscador = document.getElementById('buscador-usuarios');
const filtroEstado = document.getElementById('filtro-estado');
const filasUsuarios = document.querySelectorAll('.tabla-usuarios tbody tr');

function filtrarUsuarios() {
  const texto = buscador.value.toLowerCase();
  const estadoSeleccionado = filtroEstado.value;

  filasUsuarios.forEach(fila => {
    const nombre = fila.cells[1].textContent.toLowerCase();
    const correo = fila.cells[2].textContent.toLowerCase();
    const rol = fila.cells[3].textContent.toLowerCase();
    const estado = fila.querySelector('.estado-usuario').classList.contains('activo') ? 'activo' : 'inactivo';

    const coincideTexto = nombre.includes(texto) || correo.includes(texto) || rol.includes(texto);
    const coincideEstado = !estadoSeleccionado || estado === estadoSeleccionado;

    if (coincideTexto && coincideEstado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

buscador.addEventListener('input', filtrarUsuarios);
filtroEstado.addEventListener('change', filtrarUsuarios);
// Ejecutar al cargar la página
cargarUsuarios();
