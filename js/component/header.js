const header = document.querySelector(".header");
let screenType = window.innerWidth < 1024 ? "Mobile" : "Desktop";
const main = document.querySelector("main");

// Header
export function buildNavigation() {
  const links = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Local's Guide",
      url: "/locals-guide",
    },
    {
      label: "Content",
      url: "/content",
    },
  ];

  const skipToContentButton = document.createElement("button");
  skipToContentButton.id = "skip-to-content-btn";
  skipToContentButton.textContent = "Skip to main content";
  header.appendChild(skipToContentButton);

  const logo = document.createElement("img");
  logo.src = "/assets/logo.png";
  logo.alt = "The Green Bay Guy logo";
  logo.tabIndex = "0";
  header.appendChild(logo);

  const menuButton = document.createElement("button");
  menuButton.classList.add("toggle-nav");
  menuButton.setAttribute("aria-controls", "nav");
  menuButton.textContent = "Menu";
  header.appendChild(menuButton);

  const nav = document.createElement("nav");
  nav.classList.add("nav");
  header.appendChild(nav);

  const linkContainer = document.createElement("ul");
  nav.appendChild(linkContainer);

  links.forEach((link) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label;
    li.appendChild(a);

    linkContainer.appendChild(li);
  });

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  header.appendChild(overlay);

  navigationHandler();
}

// Functionality
function navigationHandler() {
  const toggleNavBtn = document.querySelector(".toggle-nav");
  const nav = document.querySelector(".nav");
  const skipToContentBtn = document.querySelector("#skip-to-content-btn");
  const transparentNav = document.querySelector(".header-with-hero") || "";
  const logo = document.querySelector(".header img");

  logo.addEventListener("click", () => {
    window.location.href = "/";
  });

  logo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      window.location.href = "/";
    }
  });

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
}

// Set link/container attributes
function setNavAttributes() {
  const nav = document.querySelector(".nav");
  const toggleNavBtn = document.querySelector(".toggle-nav");
  const navLinks = document.querySelectorAll(".nav ul li a");
  const overlay = document.querySelector(".overlay");

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
  const nav = document.querySelector(".nav");

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
