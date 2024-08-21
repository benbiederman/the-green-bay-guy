import { fetchData } from "./helpers/fetchData.js";
import {
  sortByRating,
  sortAlphabetically,
  filterByTags,
  filterByDistance,
} from "./helpers/filterData.js";
import { contentItem } from "./component/contentItem.js";
import { buildNavigation } from "./component/header.js";
import { buildFooter } from "./component/footer.js";
const contentContainer = document.querySelector(".content-articles-container");
const results = document.querySelector(".results-counter");
const filterToggle = document.querySelector(".filters-button") || null;
const closeButton = document.querySelector(".close-button") || null;
const categoryContainer = document.querySelector(".category-page-container");
const applyFiltersButton = document.querySelector(".apply-button");
const resetFiltersButton = document.querySelector(".reset-button");
const primaryFilters = document.querySelector(".primary-filter-tags") || null;
const primaryFilterTags = primaryFilters?.querySelectorAll("input") || null;
const secondaryFilters =
  document.querySelector(".secondary-filter-tags") || null;
const secondaryFilterTags = secondaryFilters?.querySelectorAll("input") || null;
const distanceDropdown =
  document.querySelector(".distance-from-lambeau")?.querySelectorAll("input") ||
  null;
const noResults = document.querySelector(".no-results");

buildNavigation();
buildFooter();

const path = window.location.pathname;
let contentType;

// Sets contentType and returns source for data
function getData(pagePath) {
  if (pagePath.includes("locals-guide")) {
    contentType = "local's guide";
    return "/data/locals-guides.json";
  } else if (pagePath.includes("the-green-bay-narrative")) {
    contentType = "podcast";
    return "/data/content.json";
  } else if (pagePath.includes("green-bay-rewind")) {
    contentType = "podcast";
    return "/data/content.json";
  }
}

// Set Category to show which data gets rendered on page
function setCategory(path) {
  if (path.includes("eat")) {
    return "Eat";
  } else if (path.includes("drink")) {
    return "Drink";
  } else if (path.includes("do")) {
    return "Do";
  } else if (path.includes("misc")) {
    return "Misc";
  } else if (path.includes("the-green-bay-narrative")) {
    return "Podcast";
  } else if (path.includes("green-bay-rewind")) {
    return "Live";
  }
}

let dataSource = getData(path);

let localsGuideData = await fetchData(dataSource);

if (localsGuideData && localsGuideData?.length > 0) {
  renderContent(localsGuideData);
} else {
  // Error
  // No results
  noResults.innerHTML = "";

  // No results due to search
  const header = document.createElement("h2");
  header.textContent = "Ope. That's not good.";
  noResults.appendChild(header);

  const p1 = document.createElement("p");
  p1.textContent = "Something went wrong. Please try to refresh the page";
  noResults.appendChild(p1);

  const p2 = document.createElement("p");
  p2.innerHTML =
    "If the problem continues, please email me at <a href='mailto:ben@thegreenbayguy.com'>ben@thegreenbayguy.com</a>";
  noResults.appendChild(p2);

  // Hide content container and show no results container
  contentContainer.style.display = "none";
  noResults.style.display = "flex";
}

function renderContent(data) {
  let allData = [...data];
  let categoryData = [];

  const category = setCategory(path);

  // Sort data
  if (contentType === "local's guide") {
    if (category === "Eat") {
      allData = sortByRating(allData);
    } else {
      allData = sortAlphabetically(allData);
    }
  }

  //Add items that match page category to categoryData
  allData.forEach((item) => {
    if (item.category.includes(category)) {
      categoryData.push(item);
    }
  });

  // Clear container
  contentContainer.innerHTML = "";

  // Set result counter
  results.textContent = `(${categoryData.length})`;

  //Create content for page
  if (categoryData && categoryData?.length > 0) {
    noResults.style.display = "none";
    contentContainer.style.display = "grid";
    categoryData.forEach((item) => {
      contentItem("h2", contentContainer, item);
    });
  } else {
    // No results
    noResults.innerHTML = "";

    // No results due to search
    const header = document.createElement("h2");
    header.textContent = "Ope. That's not good.";
    noResults.appendChild(header);

    const p1 = document.createElement("p");
    p1.textContent =
      "Your search results came back as empty as the trophy case in U.S. Bank Stadium.";
    noResults.appendChild(p1);

    const p2 = document.createElement("p");
    p2.textContent = "Please adjust your filters.";
    noResults.appendChild(p2);

    // Hide content container and show no results container
    contentContainer.style.display = "none";
    noResults.style.display = "flex";
  }

  window.scrollTo(0, 0);
}

if (filterToggle) {
  filterToggle.addEventListener("click", () => {
    categoryContainer.classList.toggle("filters-active");
    if (categoryContainer.classList.contains("filters-active")) {
      document.querySelector(".button-label").textContent = "Hide filters";
    } else {
      document.querySelector(".button-label").textContent = "Show filters";
    }
  });
}

if (closeButton) {
  closeButton.addEventListener("click", () => {
    categoryContainer.classList.remove("filters-active");
    document.querySelector(".button-label").textContent = "Show filters";
  });
}

if (applyFiltersButton) {
  applyFiltersButton.addEventListener("click", (e) => {
    e.preventDefault();
    setFilters(localsGuideData);
  });
}

if (resetFiltersButton) {
  resetFiltersButton.addEventListener("click", (e) => {
    e.preventDefault();
    resetFilters();
  });
}

function setFilters(data) {
  let primaryError = false;
  let secondaryError = false;
  const setPrimaryTags = [];
  const setSecondaryTags = [];
  let setDistance;

  // Set primary tags that are checked
  if (primaryFilterTags) {
    primaryFilterTags.forEach((tag) => {
      tag.checked && setPrimaryTags.push(tag.value);
    });
  }

  // Set secondary tags that are checked
  if (secondaryFilterTags) {
    secondaryFilterTags.forEach((tag) => {
      tag.checked && setSecondaryTags.push(tag.value);
    });
  }

  // Set distance that is set
  if (distanceDropdown) {
    distanceDropdown.forEach((dropdown) => {
      if (dropdown.checked) {
        setDistance = dropdown.value;
      }
    });
  }

  // Make sure at least one tag is selected
  if (primaryFilterTags && setPrimaryTags?.length === 0) {
    primaryFilters.classList.add("filters-error");
    primaryError = true;
  } else {
    primaryFilters?.classList.remove("filters-error");
    primaryError = false;
  }

  if (secondaryFilterTags && setSecondaryTags?.length === 0) {
    secondaryFilters.classList.add("filters-error");
    secondaryError = true;
  } else {
    secondaryFilters?.classList.remove("filters-error");
    secondaryError = false;
  }

  // If no tag errors - filter data
  if (!primaryError && !secondaryError) {
    filterData(
      data,
      primaryFilterTags && setPrimaryTags?.length !== primaryFilterTags?.length
        ? setPrimaryTags
        : null,
      secondaryFilterTags &&
        setSecondaryTags?.length !== secondaryFilterTags?.length
        ? setSecondaryTags
        : null,
      setDistance !== "any" ? setDistance : null
    );
  }
}

function filterData(data, primaryTags, secondaryTags, distance) {
  let filteredData = [...data];

  if (!primaryTags && !secondaryTags && !distance) {
    renderContent(filteredData);
  }

  if (primaryTags) {
    filteredData = filterByTags(filteredData, primaryTags);
  }

  if (secondaryTags) {
    filteredData = filterByTags(filteredData, secondaryTags);
  }

  if (distance) {
    filteredData = filterByDistance(filteredData, distance);
  }

  renderContent(filteredData);
  categoryContainer.classList.remove("filters-active");
  document.querySelector(".button-label").textContent = "Show filters";
}

function resetFilters() {
  document.querySelector("form").reset();
}
