const footer = document.querySelector(".footer");

// Footer
export function buildFooter() {
  buildContactCallout();
  buildLine();
  buildFooterLinks();
  buildSocialsAndCopyright();
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
          url: "/accessibility.html",
        },
        {
          label: "Business inquiries",
          url: "/business-inquiries.html",
        },
        // {
        //   label: "Privacy policy",
        //   url: "/privacy-policy.html",
        // },
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
      alt: "Tiktok icon",
      src: "/assets/icons/tiktok.png",
      url: "https://www.tiktok.com/@thegbguy",
    },
    // {
    //   alt: "Snapchat icon",
    //   src: "/assets/icons/snapchat.png",
    //   url: "https://www.snapchat.com/add/thegbguy",
    // },
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
    image.loading = "lazy";
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

  const copyrightText = document.createElement("p");
  copyrightText.innerHTML = `&copy; 2017 - ${year}. The Green Bay Guy. Powered by coffee.`;
  copyright.appendChild(copyrightText);
}
