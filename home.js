// ==========================================
// HOME PAGE
// ==========================================

const appLoading =
  document.getElementById("appLoading");

const mainApp =
  document.getElementById("mainApp");

const displayNameElement =
  document.getElementById("displayName");

const usernameElement =
  document.getElementById("username");

const welcomeName =
  document.getElementById("welcomeName");

const userAvatar =
  document.getElementById("userAvatar");

const profileButton =
  document.getElementById("profileButton");

const userMenu =
  document.getElementById("userMenu");

const logoutButton =
  document.getElementById("logoutButton");


// ==========================================
// CHECK USER SESSION
// ==========================================

async function loadUser() {

  try {

    const {
      data: { session },
      error
    } =
      await supabaseClient.auth.getSession();


    if (error) {

      console.error(
        "Session error:",
        error
      );

      window.location.href =
        "login.html";

      return;

    }


    // No logged-in user

    if (!session) {

      window.location.href =
        "login.html";

      return;

    }


    const user =
      session.user;


    console.log(
      "Logged in user:",
      user
    );


    // ======================================
    // GET USER INFORMATION
    // ======================================

    const metadata =
      user.user_metadata || {};


    const displayName =
      metadata.display_name ||
      "User";


    const username =
      metadata.username ||
      "user";


    // ======================================
    // UPDATE UI
    // ======================================

    displayNameElement.textContent =
      displayName;


    usernameElement.textContent =
      "@" + username;


    welcomeName.textContent =
      displayName;


    // First letter for avatar

    userAvatar.textContent =
      displayName
        .charAt(0)
        .toUpperCase();


    // ======================================
    // SHOW APP
    // ======================================

    appLoading.classList.add(
      "hidden"
    );


    mainApp.classList.remove(
      "hidden"
    );


  } catch (error) {

    console.error(
      "Failed to load user:",
      error
    );


    window.location.href =
      "login.html";

  }

}


// ==========================================
// PROFILE MENU
// ==========================================

if (profileButton) {

  profileButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      userMenu.classList.toggle(
        "hidden"
      );

    }
  );

}


// Close menu when clicking outside

document.addEventListener(
  "click",
  () => {

    if (userMenu) {

      userMenu.classList.add(
        "hidden"
      );

    }

  }
);


// Prevent menu click from closing itself

if (userMenu) {

  userMenu.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

    }
  );

}


// ==========================================
// LOGOUT
// ==========================================

if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    async () => {

      logoutButton.disabled =
        true;


      logoutButton.textContent =
        "Logging out...";


      const { error } =
        await supabaseClient.auth.signOut();


      if (error) {

        console.error(
          "Logout error:",
          error
        );


        logoutButton.disabled =
          false;


        logoutButton.textContent =
          "↪ Logout";


        alert(
          "Unable to log out. Please try again."
        );


        return;

      }


      window.location.href =
        "login.html";

    }
  );

}


// ==========================================
// NAVIGATION
// ==========================================

const navItems =
  document.querySelectorAll(
    ".nav-item"
  );


navItems.forEach((item) => {

  item.addEventListener(
    "click",
    () => {

      const page =
        item.dataset.page;


      if (!page) {
        return;
      }


      console.log(
        "Navigate to:",
        page
      );


      // Pages will be connected
      // as we build them.

    }
  );

});


// ==========================================
// ADD FRIEND BUTTONS
// ==========================================

const addFriendButton =
  document.getElementById(
    "addFriendButton"
  );


const emptyAddFriendButton =
  document.getElementById(
    "emptyAddFriendButton"
  );


function openAddFriend() {

  alert(
    "Add Friend is our next feature!"
  );

}


if (addFriendButton) {

  addFriendButton.addEventListener(
    "click",
    openAddFriend
  );

}


if (emptyAddFriendButton) {

  emptyAddFriendButton.addEventListener(
    "click",
    openAddFriend
  );

}


// ==========================================
// START APPLICATION
// ==========================================

loadUser();
