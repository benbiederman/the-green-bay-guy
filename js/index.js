import { buildLocalsGuide } from "./buildLocalsGuide.js";
import { fetchData } from "./fetchData.js";
const homepageHero = document.querySelector(".homepage-hero");
const homepageHeroCTA = document.querySelector(".homepage-hero-content button");
const goToButton = document.querySelector(".go-to-button");
let localsGuideData = await fetchData("./data/locals-guides.json");

homepageHeroCTA.addEventListener("click", () => {
  window.location.href = "/locals-guide";
});

goToButton.addEventListener("click", () => {
  window.location.href = "/locals-guide";
});

if (localsGuideData && localsGuideData.length && localsGuideData.length > 0) {
  generateGuideData(localsGuideData);
}

function generateGuideData(data) {
  const miscContainer = document.querySelector(".misc-articles-container");
  const goToContainer = document.querySelector(".go-to-articles-container");
  let spotlightGuide = [];
  let gotoGuides = [];

  data.forEach((guide) => {
    if (guide.favorite) {
      gotoGuides.push(guide);

      gotoGuides = sortByTagsAndRating(gotoGuides);
    }
    if (guide.spotlightGuide) {
      spotlightGuide.push(guide);
    }
  });

  if (miscContainer && spotlightGuide.length > 0) {
    spotlightGuide.forEach((guide) => {
      buildLocalsGuide("h3", miscContainer, guide);
    });
  }

  if (goToContainer && gotoGuides.length > 0) {
    gotoGuides.forEach((guide) => {
      buildLocalsGuide("h3", goToContainer, guide);
    });
  }
}

function sortByTagsAndRating(data) {
  const priority = {
    Coffee: 1,
    Breakfast: 2,
    Lunch: 3,
  };

  return data.sort((a, b) => {
    const aTagPriority = priority[a.tags[0]] || 99;
    const bTagPriority = priority[b.tags[0]] || 99;

    if (aTagPriority < bTagPriority) return -1;
    if (aTagPriority > bTagPriority) return 1;

    // If both have the same tag priority, sort by rating
    if (a.rating > b.rating) return -1;
    if (a.rating < b.rating) return 1;

    return 0;
  });
}
