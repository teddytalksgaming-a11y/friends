const togglePassword =
  document.getElementById("togglePassword");

const password =
  document.getElementById("password");

if (togglePassword && password) {

  togglePassword.addEventListener("click", () => {

    const hidden =
      password.type === "password";

    password.type =
      hidden ? "text" : "password";

    togglePassword.textContent =
      hidden ? "🙈" : "👁";

  });

}


const loginForm =
  document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
      document.getElementById("email").value.trim();

    const passwordValue =
      document.getElementById("password").value;

    const error =
      document.getElementById("loginError");


    error.textContent = "";


    if (!email || !passwordValue) {

      error.textContent =
        "Please enter your email and password.";

      return;

    }


    console.log("Login form working");

    alert(
      "Login page is working. Supabase will be connected next."
    );

  });

}
