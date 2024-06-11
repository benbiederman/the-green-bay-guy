export function setCookies() {
  let cookies = getCookies();
  if (cookies.cookies_approval) {
    if (cookies.cookies_approval === "true") {
      let container = document.createElement("script");
      // Add GTM
      let tag = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N5P8NTH');`;
      container.innerHTML = tag;
      head.appendChild(container);
    }
  } else {
    // Show Cookie Banner
    createCookieBanner();
  }
}

function getCookies() {
  const cookies = document.cookie;
  const cookiesArray = cookies.split("; ");
  const cookiesObj = {};

  cookiesArray.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookiesObj[name] = decodeURIComponent(value);
  });

  return cookiesObj;
}

function createCookieBanner() {
  const cookiePopup = document.createElement("div");
  cookiePopup.classList.add("cookie-popup");
  cookiePopup.tabIndex = 0;
  cookiePopup.focus();
  main.appendChild(cookiePopup);

  const cookieContainer = document.createElement("div");
  cookieContainer.classList.add("cookie-container");
  cookiePopup.appendChild(cookieContainer);

  const header = document.createElement("h3");
  header.textContent = "Sorry. I hate pop-ups too.";
  cookieContainer.appendChild(header);

  const copy1 = document.createElement("p");
  copy1.textContent =
    "But I love privacy, and you deserve whatever privacy you so choose.";
  cookieContainer.appendChild(copy1);

  const copy2 = document.createElement("p");
  copy2.textContent =
    "This website relies on cookies to enhance your online experience. Cookies are utilized to analyze website traffic, thereby improving website performance.";
  cookieContainer.appendChild(copy2);

  const cookiePopupCTAs = document.createElement("div");
  cookiePopupCTAs.classList.add("cookie-popup-ctas");
  cookiePopup.appendChild(cookiePopupCTAs);

  const allowButton = document.createElement("button");
  allowButton.classList.add("primary-button", "allow-button");
  allowButton.textContent = "Allow all cookies";
  cookiePopupCTAs.appendChild(allowButton);
  allowButton.addEventListener("click", (e) => {
    cookieFunctionality(e);
  });

  const necessaryButton = document.createElement("button");
  necessaryButton.classList.add("secondary-button", "allow-button");
  necessaryButton.textContent = "Use necessary cookies only";
  cookiePopupCTAs.appendChild(necessaryButton);
  necessaryButton.addEventListener("click", (e) => {
    cookieFunctionality(e);
  });

  setTimeout(() => {
    cookiePopup.classList.add("cookie-popup-active");
    cookiePopup.focus();
  }, 2000);
}

function cookieFunctionality(e) {
  const popup = document.querySelector(".cookie-popup");
  if (e?.target?.innerHTML) {
    if (e.target.innerHTML.toLowerCase() === "allow all cookies") {
      document.cookie = "cookies_approval=true; path=/";
    } else {
      document.cookie = "cookies_approval=false; path=/";
    }
  }

  setCookies();
  popup.style.display = "none";
}
