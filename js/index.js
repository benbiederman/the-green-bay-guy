import { buildLocalsGuide } from "./buildLocalsGuide.js";
import { fetchData } from "./fetchData.js";
const homepageHeroCTA = document.querySelector(".homepage-hero-content button");
let localsGuideData = await fetchData("./data/locals-guides.json");

homepageHeroCTA.addEventListener("click", () => {
  window.location.href = "/locals-guide";
});

if (localsGuideData && localsGuideData.length && localsGuideData.length > 0) {
  generateGuideData(localsGuideData);
}

function generateGuideData(data) {
  const miscContainer = document.querySelector(".misc-articles-container");
  let spotlightGuide = [];
  let gotoGuides = [];

  data.forEach((guide) => {
    if (guide.favorite) {
      gotoGuides.push(guide);
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
}
