
  const form = document.getElementById('form-agregar-producto');
  const tabla = document.querySelector('.tabla-productos tbody');

  // Guardar nuevo producto
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener datos
    const nombre = form.nombre.value;
    const categoria = form.categoria.value;
    const precio = parseFloat(form.precio.value).toFixed(2);
    const stock = form.stock.value;
    const proveedor = form.proveedor.value;

    // Generar ID automático (puedes cambiar por ID real del backend)
    const id = tabla.rows.length + 1;

    // Crear nueva fila
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${String(id).padStart(3, '0')}</td>
      <td>${nombre}</td>
      <td>${categoria}</td>
      <td>$${precio}</td>
      <td>${stock}</td>
      <td>${proveedor}</td>
    `;

    // Insertar en tabla
    tabla.appendChild(fila);

    // Limpiar formulario y cerrar modal
    form.reset();
    modal.style.display = 'none';
  });