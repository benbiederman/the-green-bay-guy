export function locationInformation(container, data) {
  data.forEach((item) => {
    buildLocation(container, item);
  });

  if (data.length > 1) {
    multipleLocations(container, data);
  }
}

function buildLocation(container, data) {
  // Container
  const locationContainer = document.createElement("div");
  locationContainer.classList.add("about-container", "container-with-copy");
  container.appendChild(locationContainer);

  // Location image
  const image = document.createElement("img");
  image.src = `/assets/locals-guide/${data.image}`;
  image.alt = data.alt;
  image.loading = "lazy";
  locationContainer.appendChild(image);

  // Location copy
  const copy = document.createElement("div");
  copy.classList.add("about-copy");
  locationContainer.appendChild(copy);

  // Location heading
  const heading = document.createElement("h2");
  heading.textContent = data.name;
  copy.appendChild(heading);

  // Location address
  if (data.street) {
    const address = document.createElement("address");
    address.classList.add("address");
    copy.appendChild(address);

    const addressCopy = document.createElement("p");
    address.appendChild(addressCopy);

    const street = document.createElement("span");
    street.classList.add("street");
    street.textContent = `${data.street} `;
    addressCopy.appendChild(street);

    const cityState = document.createElement("span");
    cityState.classList.add("city-state-zip");
    cityState.textContent = `${data.city}, ${data.state} ${data.zip}`;
    addressCopy.appendChild(cityState);
  }

  // Location hours
  if (data.hours) {
    const allHours = document.createElement("ul");
    copy.appendChild(allHours);

    data.hours.forEach((item, index) => {
      const dayHours = document.createElement("li");
      allHours.appendChild(dayHours);

      const day = document.createElement("span");
      day.classList.add("day");
      day.textContent = `${generateDay(index)}: `;
      dayHours.appendChild(day);

      const hours = document.createElement("span");
      hours.textContent = item;
      dayHours.appendChild(hours);
    });
  }

  if (data.website || data.phone) {
    const ctaContainer = document.createElement("div");
    ctaContainer.classList.add("location-ctas");
    copy.appendChild(ctaContainer);

    // Location website
    if (data.website) {
      const websiteButton = document.createElement("button");
      websiteButton.classList.add("primary-button");
      websiteButton.textContent = "View website";
      websiteButton.ariaLabel = "View location website - opens in  new window";
      ctaContainer.appendChild(websiteButton);

      websiteButton.addEventListener("click", () => {
        window.open(data.website, "_blank");
      });
    }

    // Location phone
    if (data.phone) {
      const phoneButton = document.createElement("button");
      phoneButton.classList.add("secondary-button");
      phoneButton.textContent = data.phone;
      ctaContainer.appendChild(phoneButton);

      phoneButton.addEventListener("click", () => {
        window.location.href = `tel:${data.phone}`;
      });
    }
  }
}

function multipleLocations(container) {
  const locations = document.querySelectorAll(".about-container");
  container.classList.add("multiple-locations");
  let currentLocation = 0;

  const previousButton = document.createElement("button");
  previousButton.classList.add("secondary-button", "previous-button");
  previousButton.textContent = "<";
  previousButton.ariaLabel = "Previous location button";
  container.appendChild(previousButton);

  const nextButton = document.createElement("button");
  nextButton.classList.add("secondary-button", "next-button");
  nextButton.textContent = ">";
  nextButton.ariaLabel = "Next location button";
  container.appendChild(nextButton);

  previousButton.addEventListener("click", () => {
    locations[currentLocation].style.display = "none";
    if (currentLocation === 0) {
      currentLocation = locations.length - 1;
    } else {
      currentLocation--;
    }
    locations[currentLocation].style.display = "flex";
  });

  nextButton.addEventListener("click", () => {
    locations[currentLocation].style.display = "none";
    if (currentLocation === locations.length - 1) {
      currentLocation = 0;
    } else {
      currentLocation++;
    }
    locations[currentLocation].style.display = "flex";
  });
}

function generateDay(day) {
  switch (day) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
  }
}
