// 🎯 Ventas por mes
// 🧪 Datos simulados
const ventasData = [
  { fecha: '2025-01-15', total: 300, categoria: 'Oficina', producto: 'Lápiz HB', cantidad: 50 },
  { fecha: '2025-02-10', total: 700, categoria: 'Tecnología', producto: 'USB 16GB', cantidad: 30 },
  { fecha: '2025-02-25', total: 450, categoria: 'Oficina', producto: 'Cuaderno A5', cantidad: 25 },
  { fecha: '2025-03-05', total: 900, categoria: 'Tecnología', producto: 'Monitor 24"', cantidad: 10 },
  { fecha: '2025-04-02', total: 200, categoria: 'Mobiliario', producto: 'Silla ergonómica', cantidad: 5 },
  { fecha: '2025-04-08', total: 180, categoria: 'Tecnología', producto: 'Mouse inalámbrico', cantidad: 8 }
];

// 🔧 Gráficos Chart.js
const ctxVentas = document.getElementById('grafica-ventas-mensuales').getContext('2d');
const ctxProductos = document.getElementById('grafica-productos').getContext('2d');
const ctxCategorias = document.getElementById('grafica-categorias').getContext('2d');

const graficoVentas = new Chart(ctxVentas, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Total de ventas ($)',
      data: [],
      backgroundColor: '#3498db'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Ventas por mes' }
    }
  }
});

const graficoProductos = new Chart(ctxProductos, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Unidades vendidas',
      data: [],
      backgroundColor: '#5dade2'
    }]
  },
  options: {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Productos más vendidos' }
    }
  }
});

const graficoCategorias = new Chart(ctxCategorias, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      label: 'Ingresos ($)',
      data: [],
      backgroundColor: ['#2c3e50', '#3498db', '#85c1e9']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Ingresos por categoría' }
    }
  }
});

// 🎯 Filtro de fechas
function filtrarVentasPorFecha(desde, hasta) {
  return ventasData.filter(v => {
    const fechaVenta = new Date(v.fecha);
    return (!desde || fechaVenta >= new Date(desde)) &&
      (!hasta || fechaVenta <= new Date(hasta));
  });
}

function actualizarGraficosDesdeFiltro() {
  const desde = document.getElementById('fecha-desde').value;
  const hasta = document.getElementById('fecha-hasta').value;
  const filtradas = filtrarVentasPorFecha(desde, hasta);

  // 📊 Ventas por mes
  const ventasMes = {};
  filtradas.forEach(v => {
    const mes = new Date(v.fecha).toLocaleString('es', { month: 'long' });
    ventasMes[mes] = (ventasMes[mes] || 0) + v.total;
  });
  graficoVentas.data.labels = Object.keys(ventasMes);
  graficoVentas.data.datasets[0].data = Object.values(ventasMes);
  graficoVentas.update();

  // 🛒 Productos más vendidos
  const productos = {};
  filtradas.forEach(v => {
    productos[v.producto] = (productos[v.producto] || 0) + v.cantidad;
  });
  graficoProductos.data.labels = Object.keys(productos);
  graficoProductos.data.datasets[0].data = Object.values(productos);
  graficoProductos.update();

  // 📦 Ingresos por categoría
  const categorias = {};
  filtradas.forEach(v => {
    categorias[v.categoria] = (categorias[v.categoria] || 0) + v.total;
  });
  graficoCategorias.data.labels = Object.keys(categorias);
  graficoCategorias.data.datasets[0].data = Object.values(categorias);
  graficoCategorias.update();
}
document.getElementById('exportar-estadisticas').addEventListener('click', () => {
  const desde = document.getElementById('fecha-desde').value;
  const hasta = document.getElementById('fecha-hasta').value;
  const filtradas = filtrarVentasPorFecha(desde, hasta);

  let csv = `Estadísticas de Ventas\nDesde:,${desde || '---'},Hasta:,${hasta || '---'}\n\n`;

  // 🟦 Ventas por mes
  const ventasMes = {};
  filtradas.forEach(v => {
    const mes = new Date(v.fecha).toLocaleString('es', { month: 'long' });
    ventasMes[mes] = (ventasMes[mes] || 0) + v.total;
  });

  csv += `Ventas por mes\nMes,Total ($)\n`;
  for (const mes in ventasMes) {
    csv += `"${mes}","${ventasMes[mes]}"\n`;
  }

  // 🟩 Productos más vendidos
  const productos = {};
  filtradas.forEach(v => {
    productos[v.producto] = (productos[v.producto] || 0) + v.cantidad;
  });

  csv += `\nProductos más vendidos\nProducto,Unidades\n`;
  for (const p in productos) {
    csv += `"${p}","${productos[p]}"\n`;
  }

  // 🟧 Ingresos por categoría
  const categorias = {};
  filtradas.forEach(v => {
    categorias[v.categoria] = (categorias[v.categoria] || 0) + v.total;
  });

  csv += `\nIngresos por categoría\nCategoría,Total ($)\n`;
  for (const c in categorias) {
    csv += `"${c}","${categorias[c]}"\n`;
  }

  // Descargar CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'estadisticas_ventas.csv';
  a.click();
  URL.revokeObjectURL(url);
});
// ▶️ Inicializar al cargar
actualizarGraficosDesdeFiltro();

// 🔁 Escuchar cambios en filtros
document.getElementById('fecha-desde').addEventListener('change', actualizarGraficosDesdeFiltro);
document.getElementById('fecha-hasta').addEventListener('change', actualizarGraficosDesdeFiltro);