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

const loginForm =
  document.getElementById("loginForm");

const loginPassword =
  document.getElementById("password");

const toggleLoginPassword =
  document.getElementById("togglePassword");


// Show / hide login password

if (toggleLoginPassword && loginPassword) {

  toggleLoginPassword.addEventListener(
    "click",
    () => {

      togglePasswordVisibility(
        loginPassword,
        toggleLoginPassword
      );

    }
  );

}


// Login form

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (event) => {

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


      const loginButton =
        document.getElementById("loginButton");


      // Clear previous error

      error.textContent = "";


      // ======================================
      // VALIDATION
      // ======================================

      if (!email || !passwordValue) {

        error.textContent =
          "Please enter your email and password.";

        return;

      }


      // ======================================
      // START LOADING
      // ======================================

      loginButton.disabled = true;

      loginButton.textContent =
        "Logging in...";


      try {

        // ======================================
        // SUPABASE LOGIN
        // ======================================

        const {
          data,
          error: loginError
        } =
          await supabaseClient.auth.signInWithPassword({

            email: email,

            password: passwordValue

          });


        // ======================================
        // LOGIN ERROR
        // ======================================

        if (loginError) {

          console.error(
            "Login error:",
            loginError
          );


          error.textContent =
            loginError.message;


          loginButton.disabled = false;

          loginButton.textContent =
            "Login";


          return;

        }


        // ======================================
        // LOGIN SUCCESS
        // ======================================

        console.log(
          "Login successful:",
          data.user
        );


        // Go to home page

        window.location.href =
          "index.html";


      } catch (err) {

        console.error(
          "Unexpected login error:",
          err
        );


        error.textContent =
          "Something went wrong. Please try again.";


        loginButton.disabled = false;

        loginButton.textContent =
          "Login";

      }

    }
  );

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
    async (event) => {

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


      const signupButton =
        document.getElementById(
          "signupButton"
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
      // START LOADING
      // ======================================

      signupButton.disabled = true;

      signupButton.textContent =
        "Creating account...";


      try {

        // ======================================
        // CREATE SUPABASE ACCOUNT
        // ======================================

        const {
          data,
          error: signupError
        } =
          await supabaseClient.auth.signUp({

            email: email,

            password: passwordValue,

            options: {

              data: {

                display_name:
                  displayName,

                username:
                  username

              }

            }

          });


        // ======================================
        // SIGNUP ERROR
        // ======================================

        if (signupError) {

          console.error(
            "Signup error:",
            signupError
          );


          message.textContent =
            signupError.message;


          message.classList.add(
            "error-message"
          );


          signupButton.disabled =
            false;


          signupButton.textContent =
            "Create Account";


          return;

        }


        // ======================================
        // SIGNUP SUCCESS
        // ======================================

        console.log(
          "Account created:",
          data.user
        );


        message.textContent =
          "Account created successfully! Check your email if verification is required.";


        message.classList.add(
          "success-message"
        );


        signupButton.disabled =
          false;


        signupButton.textContent =
          "Create Account";


        // If Supabase automatically created
        // a logged-in session, send user home.

        if (data.session) {

          setTimeout(() => {

            window.location.href =
              "index.html";

          }, 1000);

        }


      } catch (err) {

        // ======================================
        // UNEXPECTED ERROR
        // ======================================

        console.error(
          "Unexpected signup error:",
          err
        );


        message.textContent =
          "Something went wrong. Please try again.";


        message.classList.add(
          "error-message"
        );


        signupButton.disabled =
          false;


        signupButton.textContent =
          "Create Account";

      }

    }
  );

}
