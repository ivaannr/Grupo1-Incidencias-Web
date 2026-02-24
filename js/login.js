document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = API_DATA.users.find(u => u.email === email);

  if (!user) {
    alert("Usuario no encontrado");
    return;
  }

  if (password !== "1234") {
    alert("Contraseña incorrecta");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "dashboard.html";
});
