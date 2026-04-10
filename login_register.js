document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".form-boxlogin");
  const registerForm = document.querySelector(".form-boxregister");
  const registerLink = document.querySelector(".register-link");
  const loginLink = document.querySelector(".login-link");

  // Show login by default
  loginForm.classList.add("active");

  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
  });

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  });
});
