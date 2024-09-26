import { buildNavigation } from "./component/header.js";
import { buildFooter } from "./component/footer.js";
import { fetchData } from "./helpers/fetchData.js";
import { contentItem } from "./component/contentItem.js";
const content = document.querySelector(".content");

buildNavigation();

// Fetch data
let contentData = await fetchData("/data/content.json");
let trendingEpisodes = [];
let newEpisodes = [];
let gbNarrativeEpisodes = [];
let gbRewindEpisodes = [];

contentData.forEach((item) => {
  // Trending episodes
  if (item.trending) {
    trendingEpisodes.push(item);
  }

  // Episodes released in previous 30 days
  if (isNewEpisode(item.releaseDate)) {
    newEpisodes.unshift(item);
  }

  // Green Bay Rewind Episodes
  if (item.show === "Green Bay Rewind") {
    gbRewindEpisodes.push(item);
  }

  // Green Bay Narrative Episodes
  if (item.show === "The Green Bay Narrative") {
    gbNarrativeEpisodes.push(item);
  }
});

// Checks if episode is under 30 days old
function isNewEpisode(date) {
  const [month, day, year] = date.split("/");
  const parsedDate = new Date(year, month - 1, day);

  const currentDate = new Date();

  // Calculate the difference in time
  const timeDifference = currentDate - parsedDate;

  // Convert the difference to days
  const differenceInDays = timeDifference / (1000 * 60 * 60 * 24);

  // Check if the difference is less than 30 days
  return differenceInDays < 30;
}

const categories = [
  {
    header: "New releases",
    data: newEpisodes,
    counter: 0,
    overflowURL: null,
  },
  {
    header: "Trending",
    data: trendingEpisodes,
    counter: 0,
    overflowURL: null,
  },
  {
    header: "Green Bay Rewind",
    data: gbRewindEpisodes,
    counter: 0,
    overflowURL: "green-bay-rewind",
  },
  {
    header: "The Green Bay Narrative",
    data: gbNarrativeEpisodes,
    counter: 0,
    overflowURL: "the-green-bay-narrative",
  },
];

// Generate each category
generateCategories();

buildFooter();

function buildSection(category) {
  // Each categry section
  const section = document.createElement("section");
  section.classList.add("content-container");
  content.appendChild(section);

  // Header
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");
  section.appendChild(headerContainer);

  if (category.data.length > 10 && category.overflowURL) {
    const headerLink = document.createElement("a");
    headerLink.href = `/content/${category.overflowURL}.html`;
    headerContainer.appendChild(headerLink);

    const header = document.createElement("h2");
    header.textContent = `${category.header} | See all`;
    headerLink.appendChild(header);
  } else {
    const header = document.createElement("h2");
    header.textContent = category.header;
    headerContainer.appendChild(header);
  }

  // Content container
  const slider = document.createElement("div");
  const length = category.data.length > 4 ? 4 : category.data.length;
  slider.classList.add(
    "content-slider-container",
    `${category.header.toLowerCase().split(" ").join("-")}-content`
  );
  section.appendChild(slider);

  let categoryContainer = document.querySelector(
    `.${category.header.toLowerCase().split(" ").join("-")}-content`
  );

  // Create episodes
  for (let i = 0; i < length; i++) {
    contentItem("h3", categoryContainer, category.data[i]);
  }

  // If more than 10 episodes, add more button
  if (category.data.length > 4 && category.overflowURL) {
    let ctaText = "See all episodes";

    const sliderButton = document.createElement("button");
    sliderButton.textContent = ctaText;
    sliderButton.classList.add("content-item", "item-active");
    slider.appendChild(sliderButton);

    sliderButton.addEventListener("click", () => {
      window.location.href = `/content/${category.overflowURL}.html`;
    });

    const containerButton = document.createElement("button");
    containerButton.textContent = ctaText;
    containerButton.classList.add("primary-button", "container-button");
    section.appendChild(containerButton);

    containerButton.addEventListener("click", () => {
      window.location.href = `/content/${category.overflowURL}.html`;
    });
  }

  setPosition(categoryContainer);
  categoryHandler(categoryContainer, category);
}

function setPosition(category) {
  if (category) {
    let episodes = category.children || [];
    let activeEpisodes = [];

    for (let i = 0; i < episodes.length; i++) {
      if (episodes[i].classList.contains("item-active")) {
        activeEpisodes.push(episodes[i]);
      }
    }

    for (let i = 0; i < activeEpisodes.length; i++) {
      activeEpisodes[i].style.left = `${i * 350}px`;
    }
  }
}

function categoryHandler(container, category) {
  let touchStart = 0;
  let touchEnd = 0;
  const minSwipeDistance = 50;

  if (container) {
    container.addEventListener("touchstart", (e) => {
      touchStart = e.changedTouches[0].screenX;
    });

    container.addEventListener("touchend", (e) => {
      touchEnd = e.changedTouches[0].screenX;
      const swipeDistance = Math.abs(touchStart - touchEnd);

      if (swipeDistance > minSwipeDistance) {
        if (touchStart > touchEnd) {
          handleSwipe("right", container, category);
        } else if (touchEnd > touchStart) {
          handleSwipe("left", container, category);
        }
      }
    });

    container.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && e.shiftKey !== true) {
        handleSwipe("right", container, category);
      }
      if (e.key === "Tab" && e.shiftKey === true) {
        handleSwipe("left", container, category);
      }
    });
  }
}

function handleSwipe(direction, container, category) {
  let episodes = container.children;

  if (direction === "right") {
    if (category.counter < episodes.length - 1) {
      episodes[category.counter].classList.remove("item-active");
      episodes[category.counter].classList.add("item-inactive");
      category.counter += 1;
    }
  }

  if (direction === "left") {
    if (category.counter > 0) {
      category.counter -= 1;
      episodes[category.counter].classList.remove("item-inactive");
      episodes[category.counter].classList.add("item-active");
    }
  }

  setPosition(container, category);
}

function generateCategories() {
  categories.forEach((category) => {
    if (category?.data.length > 0) {
      buildSection(category);
    }
  });
}
