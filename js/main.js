const header = document.querySelector(".header");
let screenType = window.innerWidth < 1024 ? "Mobile" : "Desktop";

function buildNavigation() {
  const navigation = `<button id="skip-to-content-btn">Skip to main content</button>
    <img src="/assets/logo.png" alt="The Green Bay Guy logo" />
    <button class="toggle-nav" aria-controls="nav">Menu</button>
    <div class="nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/locals-guide">Local's Guide</a></li>
        <li><a href="/content">Content</a></li>
        <li><a href="/shop">Shop</a></li>
      </ul>
    </div>`;

  header.innerHTML = navigation;
  navigationHandler();
}

function navigationHandler() {
  const toggleNavBtn = document.querySelector(".toggle-nav");
  const mobileNav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav ul li a");
  const skipToContentBtn = document.querySelector("#skip-to-content-btn");
  let transparentNav = document.querySelector(".header-with-hero") || "";

  setNavAttributes();

  // Reset if user resizes window
  window.addEventListener("resize", () => {
    let screenAdjustment = window.innerWidth;
    if (screenType === "Mobile" && screenAdjustment >= 1024) {
      screenType = "Desktop";
      setNavAttributes();
    }
    if (screenType === "Desktop" && screenAdjustment < 1024) {
      screenType = "Mobile";
      setNavAttributes();
    }
  });

  if (transparentNav) {
    window.addEventListener("scroll", () => {
      headerUpdate();
    });
  }

  // Skip to Content handler
  skipToContentBtn.addEventListener("click", () => {
    window.location = "#main";
  });

  // Mobile nav button handler
  toggleNavBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("nav-active");
    setNavAttributes();
  });

  // Set link/container attributes
  function setNavAttributes() {
    const mobileNav = document.querySelector(".nav");
    if (screenType === "Mobile") {
      if (mobileNav.classList.contains("nav-active")) {
        toggleNavBtn.ariaExpanded = true;
        navLinks.forEach((link) => {
          link.tabIndex = 0;
        });
      } else {
        toggleNavBtn.ariaExpanded = false;
        navLinks.forEach((link) => {
          link.tabIndex = -1;
        });
      }
    }
    if (screenType === "Desktop") {
      navLinks.forEach((link) => {
        link.tabIndex = 0;
      });
    }
  }

  // Adds background color to header
  function headerUpdate() {
    let yPosition = window.scrollY;

    if (transparentNav) {
      if (yPosition > 0) {
        header.classList.add("nav-scroll");
      } else {
        header.classList.remove("nav-scroll");
      }
    }
  }
}

buildNavigation();
