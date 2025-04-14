document.getElementById('exportar-ventas').addEventListener('click', () => {
  const tabla = document.querySelector('.tabla-ventas table');
  const filas = tabla.querySelectorAll('tbody tr');
  const encabezados = Array.from(tabla.querySelectorAll('thead th')).map(th => th.textContent.trim());

  let csv = encabezados.join(',') + '\n';

  filas.forEach(fila => {
    if (fila.style.display === 'none') return; // ignorar filas ocultas
    const celdas = Array.from(fila.querySelectorAll('td')).map(td =>
      `"${td.textContent.trim().replace(/"/g, '""')}"`
    );
    csv += celdas.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'ventas_exportadas.csv';
  a.click();

  URL.revokeObjectURL(url);
});