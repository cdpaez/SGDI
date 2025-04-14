// Productos de ejemplo con precio
const productosDisponibles = {
  usb: { nombre: "USB 16GB", precio: 7.5 },
  cuaderno: { nombre: "Cuaderno A5", precio: 2.0 },
  lapiz: { nombre: "Lápiz HB", precio: 0.5 }
};

const selectProducto = document.querySelector('select[name="producto"]');
const inputCantidad = document.querySelector('input[name="cantidad"]');
const tablaVentaBody = document.getElementById('tabla-venta-body');
const totalVenta = document.getElementById('total-venta');

const btnAgregar = document.getElementById('agregar-producto');
const formVenta = document.getElementById('form-venta');

let ventaActual = [];

// Agregar producto a la tabla
btnAgregar.addEventListener('click', () => {
  const key = selectProducto.value;
  const cantidad = parseInt(inputCantidad.value);

  if (!key || !cantidad || cantidad <= 0) {
    alert("Selecciona un producto válido y una cantidad mayor a 0.");
    return;
  }

  const producto = productosDisponibles[key];
  const subtotal = producto.precio * cantidad;

  ventaActual.push({ key, nombre: producto.nombre, cantidad, precio: producto.precio, subtotal });

  renderizarTabla();
  calcularTotal();

  // Reset selección
  selectProducto.value = "";
  inputCantidad.value = 1;
});

// Renderizar tabla
function renderizarTabla() {
  tablaVentaBody.innerHTML = "";

  ventaActual.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
    <td>${item.nombre}</td>
    <td>${item.cantidad}</td>
    <td>$${item.precio.toFixed(2)}</td>
    <td>$${item.subtotal.toFixed(2)}</td>
    <td><button onclick="eliminarProducto(${index})">🗑️</button></td>
  `;
    tablaVentaBody.appendChild(fila);
  });
}

// Eliminar producto
function eliminarProducto(index) {
  ventaActual.splice(index, 1);
  renderizarTabla();
  calcularTotal();
}

// Calcular total
function calcularTotal() {
  const total = ventaActual.reduce((sum, item) => sum + item.subtotal, 0);
  totalVenta.textContent = `$${total.toFixed(2)}`;
}

// Enviar venta
formVenta.addEventListener('submit', (e) => {
  e.preventDefault();

  if (ventaActual.length === 0) {
    alert("Agrega al menos un producto a la venta.");
    return;
  }

  const metodoPago = formVenta.metodo_pago.value;
  const resumenVenta = {
    productos: ventaActual,
    metodo: metodoPago,
    total: totalVenta.textContent,
    fecha: new Date().toLocaleString()
  };

  console.log("VENTA REGISTRADA:", resumenVenta);
  alert("✅ Venta registrada con éxito.");

  // Reset
  ventaActual = [];
  renderizarTabla();
  calcularTotal();
  formVenta.reset();
});