const inputFechaInicio = document.getElementById('fecha-inicio');
const inputFechaFin = document.getElementById('fecha-fin');
const inputBusqueda = document.getElementById('buscador-ventas');
const filasVentas = document.querySelectorAll('.tabla-ventas tbody tr');

function filtrarVentas() {
  const desde = inputFechaInicio.value ? new Date(inputFechaInicio.value) : null;
  const hasta = inputFechaFin.value ? new Date(inputFechaFin.value) : null;
  const texto = inputBusqueda.value.toLowerCase();

  filasVentas.forEach(fila => {
    const fechaTexto = fila.cells[1].textContent;
    const fechaVenta = new Date(fechaTexto.split(' ')[0]);

    const numVenta = fila.cells[0].textContent.toLowerCase();
    const productos = fila.cells[2].textContent.toLowerCase();
    const metodo = fila.cells[4].textContent.toLowerCase();
    const vendedor = fila.cells[5].textContent.toLowerCase();

    const coincideFecha =
      (!desde || fechaVenta >= desde) &&
      (!hasta || fechaVenta <= hasta);

    const coincideTexto =
      numVenta.includes(texto) ||
      productos.includes(texto) ||
      metodo.includes(texto) ||
      vendedor.includes(texto);

    fila.style.display = coincideFecha && coincideTexto ? '' : 'none';
  });
}

// Eventos para filtros
inputFechaInicio.addEventListener('change', filtrarVentas);
inputFechaFin.addEventListener('change', filtrarVentas);
inputBusqueda.addEventListener('input', filtrarVentas);