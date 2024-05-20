const header = document.querySelector(".header");
let screenType = window.innerWidth < 1024 ? "Mobile" : "Desktop";

function buildNavigation() {
  const navigation = `<button id="skip-to-content-btn">Skip to main content</button>
    <img src="/assets/logo.png" alt="The Green Bay Guy logo" />
    <button class="toggle-nav" aria-controls="nav">Menu</button>
    <nav class="nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/locals-guide">Local's Guide</a></li>
        <li><a href="/content">Content</a></li>
        <li><a href="/shop">Shop</a></li>
      </ul>
    </nav>
    <div class="overlay" />`;

  header.innerHTML = navigation;
  navigationHandler();
}

function navigationHandler() {
  const toggleNavBtn = document.querySelector(".toggle-nav");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav ul li a");
  const skipToContentBtn = document.querySelector("#skip-to-content-btn");
  const transparentNav = document.querySelector(".header-with-hero") || "";
  const overlay = document.querySelector(".overlay");

  setNavAttributes();

  // Reset if user resizes window
  window.addEventListener("resize", () => {
    let screenAdjustment = window.innerWidth;
    if (screenType === "Mobile" && screenAdjustment >= 1024) {
      screenType = "Desktop";
      setNavAttributes();
      setHeaderStyling();
    }
    if (screenType === "Desktop" && screenAdjustment < 1024) {
      screenType = "Mobile";
      setNavAttributes();
      setHeaderStyling();
    }
  });

  if (transparentNav) {
    window.addEventListener("scroll", () => {
      setHeaderStyling();
    });
  }

  // Skip to Content handler
  skipToContentBtn.addEventListener("click", () => {
    window.location = "#main";
  });

  // Mobile nav button handler
  toggleNavBtn.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    setNavAttributes();
    setHeaderStyling();
  });

  // Set link/container attributes
  function setNavAttributes() {
    const nav = document.querySelector(".nav");
    if (screenType === "Mobile") {
      if (nav.classList.contains("nav-active")) {
        toggleNavBtn.textContent = "Close";
        toggleNavBtn.ariaExpanded = true;
        navLinks.forEach((link) => {
          link.tabIndex = 0;
        });
        overlay.style.display = "block";
        overlay.style.opacity = 0.8;
      } else {
        toggleNavBtn.textContent = "Menu";
        toggleNavBtn.ariaExpanded = false;
        navLinks.forEach((link) => {
          link.tabIndex = -1;
        });
        overlay.style.display = "none";
        overlay.style.opacity = 0;
      }
    }
    if (screenType === "Desktop") {
      navLinks.forEach((link) => {
        link.tabIndex = 0;
      });
      overlay.style.display = "none";
      overlay.style.opacity = 0;
    }
  }

  function setHeaderStyling() {
    if (screenType === "Mobile") {
      if (nav.classList.contains("nav-active") || window.scrollY > 0) {
        header.classList.add("background-black");
      } else {
        header.classList.remove("background-black");
      }
    }
    if (screenType === "Desktop") {
      if (window.scrollY > 0) {
        header.classList.add("background-black");
      } else {
        header.classList.remove("background-black");
      }
    }
  }
}

buildNavigation();
