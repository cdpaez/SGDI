// 🔢 Datos simulados completos (por fecha)
const ventasSimuladas = [
  { fecha: "2025-03-14", producto: "USB 16GB", cantidad: 2, total: 15.00 },
  { fecha: "2025-03-14", producto: "Lápiz HB", cantidad: 5, total: 2.50 },
  { fecha: "2025-03-15", producto: "Cuaderno A5", cantidad: 3, total: 6.00 },
  { fecha: "2025-03-15", producto: "Lápiz HB", cantidad: 4, total: 2.00 },
  { fecha: "2025-03-16", producto: "USB 16GB", cantidad: 4, total: 30.00 },
  { fecha: "2025-03-17", producto: "Cuaderno A5", cantidad: 8, total: 16.00 },
  { fecha: "2025-03-18", producto: "USB 16GB", cantidad: 3, total: 22.50 },
  { fecha: "2025-03-18", producto: "Cuaderno A5", cantidad: 3, total: 6.00 },
  { fecha: "2025-03-19", producto: "Lápiz HB", cantidad: 15, total: 7.50 },
  { fecha: "2025-03-20", producto: "USB 16GB", cantidad: 2, total: 15.00 }
  // ... puedes agregar más
];

const ctxVentas = document.getElementById("grafica-mis-ventas").getContext("2d");
const ctxProductos = document.getElementById("grafica-mis-productos").getContext("2d");
const totalGeneradoEl = document.getElementById("total-generado");

let chartVentas, chartProductos;

function filtrarPorFecha(desde, hasta) {
  return ventasSimuladas.filter(v => {
    const fecha = new Date(v.fecha);
    return (!desde || fecha >= new Date(desde)) && (!hasta || fecha <= new Date(hasta));
  });
}

function agruparVentasPorDia(ventas) {
  const ventasPorDia = {};
  ventas.forEach(v => {
    ventasPorDia[v.fecha] = (ventasPorDia[v.fecha] || 0) + v.total;
  });
  return ventasPorDia;
}

function agruparProductos(ventas) {
  const productos = {};
  ventas.forEach(v => {
    productos[v.producto] = (productos[v.producto] || 0) + v.cantidad;
  });
  return productos;
}

function renderizarGraficas(ventasFiltradas) {
  // Agrupaciones
  const ventasPorDia = agruparVentasPorDia(ventasFiltradas);
  const productos = agruparProductos(ventasFiltradas);

  // Labels y datos
  const labelsVentas = Object.keys(ventasPorDia);
  const datosVentas = Object.values(ventasPorDia);

  const labelsProductos = Object.keys(productos);
  const datosProductos = Object.values(productos);

  // Total generado
  const total = datosVentas.reduce((acc, val) => acc + val, 0);
  totalGeneradoEl.textContent = `$${total.toFixed(2)}`;

  // Destruir gráficos anteriores si existen
  if (chartVentas) chartVentas.destroy();
  if (chartProductos) chartProductos.destroy();

  // Crear gráfica de ventas
  chartVentas = new Chart(ctxVentas, {
    type: "bar",
    data: {
      labels: labelsVentas,
      datasets: [{
        label: "Total ($)",
        data: datosVentas,
        backgroundColor: "#3498db"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Ventas realizadas por día" },
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Crear gráfica de productos
  chartProductos = new Chart(ctxProductos, {
    type: "bar",
    data: {
      labels: labelsProductos,
      datasets: [{
        label: "Cantidad vendida",
        data: datosProductos,
        backgroundColor: ["#2c3e50", "#3498db", "#85c1e9"]
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        title: { display: true, text: "Productos más vendidos" },
        legend: { display: false }
      }
    }
  });
}

// Inicializar con todos los datos
renderizarGraficas(ventasSimuladas);

// Escuchar filtros
document.getElementById("filtrar-estadisticas").addEventListener("click", () => {
  const desde = document.getElementById("mi-fecha-inicio").value;
  const hasta = document.getElementById("mi-fecha-fin").value;

  const filtradas = filtrarPorFecha(desde, hasta);
  renderizarGraficas(filtradas);
});