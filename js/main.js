const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
let screenType = window.innerWidth < 1024 ? "Mobile" : "Desktop";

// Header
function buildNavigation() {
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

// Footer
function buildFooter() {
  buildContactCallout();
  buildLine();
  buildFooterLinks();
  buildSocialsAndCopyright();
}

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

function buildContactCallout() {
  const calloutHeading = `Visiting Green Bay?`;
  const calloutCopy = `A trip to Green Bay means a lot to many people. They save up and plan
  for years for it. My main goal is to make sure your trip is everything
  you expected it to be. If you have any questions or just want to say
  hi, don't hesitate to contact me. I'm here to help however I can.`;
  const calloutCTAs = [
    {
      label: "Email",
      url: "mailto:ben@thegreenbayguy.com",
      type: "primary",
    },
    {
      label: "Text",
      url: "sms:9207703933",
      type: "secondary",
    },
  ];

  const contactCallout = document.createElement("section");
  contactCallout.classList.add("container-with-copy", "contact-container");
  footer.appendChild(contactCallout);

  const heading = document.createElement("h2");
  heading.textContent = calloutHeading;
  contactCallout.appendChild(heading);

  const copy = document.createElement("p");
  copy.textContent = calloutCopy;
  contactCallout.appendChild(copy);

  const ctaContainer = document.createElement("div");
  ctaContainer.classList.add("contact-container-ctas");
  contactCallout.appendChild(ctaContainer);

  calloutCTAs.forEach((cta) => {
    const button = document.createElement("button");
    button.classList.add(
      `${cta.label.toLowerCase()}-button`,
      `${cta.type}-button`
    );
    button.textContent = cta.label;
    ctaContainer.appendChild(button);

    const buttonHandler = document.querySelector(
      `.${cta.label.toLowerCase()}-button`
    );

    buttonHandler.addEventListener("click", () => {
      window.location.href = cta.url;
    });
  });
}

function buildLine() {
  const line = document.createElement("div");
  line.classList.add("hr", "hr-primary");
  footer.appendChild(line);
}

function buildFooterLinks() {
  const footerLinks = [
    {
      heading: "Additional links",
      links: [
        {
          label: "Accessibility",
          url: "/accessibility",
        },
        {
          label: "Business inquiries",
          url: "/business-inquiries",
        },
        {
          label: "Privacy policy",
          url: "/privacy-policy",
        },
      ],
    },
    {
      heading: "Contact",
      links: [
        {
          label: "ben@thegreenbayguy.com",
          url: "mailto:ben@thegreenbayguy.com",
        },
      ],
    },
  ];

  const siteLinks = document.createElement("div");
  siteLinks.classList.add("site-links");
  footer.appendChild(siteLinks);

  footerLinks.forEach((group) => {
    const groupContainer = document.createElement("div");
    groupContainer.classList.add("links");
    siteLinks.appendChild(groupContainer);

    const heading = document.createElement("p");
    heading.textContent = group.heading;
    groupContainer.appendChild(heading);

    const links = document.createElement("ul");
    groupContainer.appendChild(links);

    // Creates each link in each group
    group.links.forEach((link) => {
      const li = document.createElement("li");
      links.appendChild(li);

      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.label;
      li.appendChild(a);
    });
  });
}

function buildSocialsAndCopyright() {
  const socialMedias = [
    {
      alt: "Facebook icon",
      src: "/assets/icons/facebook.png",
      url: "https://www.facebook.com/TheGreenBayGuy/",
    },
    {
      alt: "Instagram icon",
      src: "/assets/icons/instagram.png",
      url: "https://www.instagram.com/thegreenbayguy/",
    },
    {
      alt: "Twitter icon",
      src: "/assets/icons/twitter.png",
      url: "https://x.com/TheGreenBayGuy",
    },
    {
      alt: "Snapchat icon",
      src: "/assets/icons/snapchat.png",
      url: "https://www.snapchat.com/add/thegbguy",
    },
    {
      alt: "YouTube icon",
      src: "/assets/icons/youtube.png",
      url: "https://www.youtube.com/thegreenbayguy",
    },
  ];

  const year = new Date().getFullYear();

  const footerInfo = document.createElement("div");
  footerInfo.classList.add("footer-info");
  footer.appendChild(footerInfo);

  const socialsContainer = document.createElement("div");
  socialsContainer.classList.add("socials");
  footerInfo.appendChild(socialsContainer);

  socialMedias.forEach((site) => {
    const image = document.createElement("img");
    image.src = site.src;
    image.alt = `${site.alt} (opens in new window)`;
    image.tabIndex = 0;
    image.classList.add(`${site.alt.toLowerCase().split(" ").join("-")}`);
    socialsContainer.appendChild(image);

    const icon = document.querySelector(
      `.${site.alt.toLowerCase().split(" ").join("-")}`
    );

    icon.addEventListener("click", () => {
      window.open(site.url, "_blank");
    });

    icon.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        window.open(site.url, "_blank");
      }
    });
  });

  const copyright = document.createElement("div");
  copyright.classList.add("copyright");
  footerInfo.appendChild(copyright);

  copyrightText = document.createElement("p");
  copyrightText.innerHTML = `&copy; 2017 - ${year}. The Green Bay Guy. Powered by coffee.`;
  copyright.appendChild(copyrightText);
}

buildNavigation();
buildFooter();
