const formPerfil = document.getElementById("form-perfil");
const body = document.body;
const cerrarSesionBtn = document.getElementById("cerrar-sesion");

// 🌗 Aplicar preferencias si están guardadas
const preferencias = JSON.parse(localStorage.getItem("preferenciasPerfil")) || {};

if (preferencias.modoOscuro) {
  body.classList.add("modo-oscuro");
  formPerfil.modo_oscuro.checked = true;
}

if (preferencias.letraGrande) {
  body.classList.add("letra-grande");
  formPerfil.letra_grande.checked = true;
}

// ✅ Guardar cambios de perfil
formPerfil.addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevaPass = formPerfil.nueva_contrasena.value;
  const confirmarPass = formPerfil.confirmar_contrasena.value;

  if (nuevaPass || confirmarPass) {
    if (nuevaPass !== confirmarPass) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    } else if (nuevaPass.length < 6) {
      alert("❌ La contraseña debe tener al menos 6 caracteres.");
      return;
    } else {
      console.log("🔐 Contraseña actualizada:", nuevaPass);
      alert("✅ Contraseña actualizada con éxito.");
    }
  }

  // Guardar preferencias
  const modoOscuro = formPerfil.modo_oscuro.checked;
  const letraGrande = formPerfil.letra_grande.checked;

  localStorage.setItem("preferenciasPerfil", JSON.stringify({ modoOscuro, letraGrande }));

  // Aplicar clases visuales
  body.classList.toggle("modo-oscuro", modoOscuro);
  body.classList.toggle("letra-grande", letraGrande);

  alert("✅ Preferencias guardadas.");
  formPerfil.reset();
});

// 🚪 Cerrar sesión
cerrarSesionBtn.addEventListener("click", function () {
  const confirmar = confirm("¿Deseas cerrar sesión?");
  if (confirmar) {
    window.location.href = "index.html"; // o login.html si lo usas
  }
});