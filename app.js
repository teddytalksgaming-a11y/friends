// ==========================================
// SHARED FUNCTIONS
// ==========================================

function togglePasswordVisibility(input, button) {
  if (!input || !button) return;

  const hidden = input.type === "password";

  input.type = hidden ? "text" : "password";
  button.textContent = hidden ? "🙈" : "👁";
}


// ==========================================
// LOGIN PAGE
// ==========================================

const loginForm = document.getElementById("loginForm");

const loginPassword = document.getElementById("password");

const toggleLoginPassword =
  document.getElementById("togglePassword");


// Show / hide login password

if (toggleLoginPassword && loginPassword) {

  toggleLoginPassword.addEventListener("click", () => {

    togglePasswordVisibility(
      loginPassword,
      toggleLoginPassword
    );

  });

}


// Login form

if (loginForm) {

  loginForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const email =
      document
        .getElementById("email")
        .value
        .trim();


    const passwordValue =
      loginPassword.value;


    const error =
      document.getElementById("loginError");


    // Clear old error

    error.textContent = "";


    // Validate fields

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


// ==========================================
// SIGNUP PAGE
// ==========================================

const signupForm =
  document.getElementById("signupForm");

const signupPassword =
  document.getElementById("signupPassword");

const confirmPassword =
  document.getElementById("confirmPassword");

const toggleSignupPassword =
  document.getElementById("toggleSignupPassword");

const toggleConfirmPassword =
  document.getElementById("toggleConfirmPassword");


// Show / hide signup password

if (
  toggleSignupPassword &&
  signupPassword
) {

  toggleSignupPassword.addEventListener(
    "click",
    () => {

      togglePasswordVisibility(
        signupPassword,
        toggleSignupPassword
      );

    }
  );

}


// Show / hide confirm password

if (
  toggleConfirmPassword &&
  confirmPassword
) {

  toggleConfirmPassword.addEventListener(
    "click",
    () => {

      togglePasswordVisibility(
        confirmPassword,
        toggleConfirmPassword
      );

    }
  );

}


// Signup form

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const displayName =
        document
          .getElementById("displayName")
          .value
          .trim();


      const username =
        document
          .getElementById("username")
          .value
          .trim()
          .toLowerCase();


      const email =
        document
          .getElementById("signupEmail")
          .value
          .trim();


      const passwordValue =
        signupPassword.value;


      const confirmPasswordValue =
        confirmPassword.value;


      const message =
        document.getElementById(
          "signupMessage"
        );


      // Reset message

      message.textContent = "";

      message.className =
        "form-message";


      // ======================================
      // CHECK EMPTY FIELDS
      // ======================================

      if (
        !displayName ||
        !username ||
        !email ||
        !passwordValue ||
        !confirmPasswordValue
      ) {

        message.textContent =
          "Please fill in all fields.";

        message.classList.add(
          "error-message"
        );

        return;

      }


      // ======================================
      // USERNAME VALIDATION
      // ======================================

      const usernamePattern =
        /^[a-z0-9_]+$/;


      if (
        !usernamePattern.test(username)
      ) {

        message.textContent =
          "Username can only contain letters, numbers and underscores.";

        message.classList.add(
          "error-message"
        );

        return;

      }


      if (
        username.length < 3 ||
        username.length > 24
      ) {

        message.textContent =
          "Username must be between 3 and 24 characters.";

        message.classList.add(
          "error-message"
        );

        return;

      }


      // ======================================
      // PASSWORD VALIDATION
      // ======================================

      if (passwordValue.length < 8) {

        message.textContent =
          "Password must contain at least 8 characters.";

        message.classList.add(
          "error-message"
        );

        return;

      }


      // ======================================
      // CONFIRM PASSWORD
      // ======================================

      if (
        passwordValue !==
        confirmPasswordValue
      ) {

        message.textContent =
          "Passwords do not match.";

        message.classList.add(
          "error-message"
        );

        return;

      }


      // ======================================
      // SUCCESS
      // ======================================

      console.log(
        "Signup form working",
        {
          displayName,
          username,
          email
        }
      );


      message.textContent =
        "Signup form is working!";

      message.classList.add(
        "success-message"
      );

    }
  );

}
