import { buildLocalsGuide } from "./buildLocalsGuide.js";
import { fetchData } from "./helpers/fetchData.js";
import { sortByTagsAndRating } from "./helpers/filterData.js";
import { buildNavigation } from "./component/header.js";
import { buildFooter } from "./component/footer.js";
import { setCookies } from "./component/cookieConsent.js";

const homepageHeroCTA = document.querySelector(".homepage-hero-content button");
const goToButton = document.querySelector(".go-to-button");
let localsGuideData = await fetchData("./data/locals-guides.json");

homepageHeroCTA.addEventListener("click", () => {
  window.location.href = "/locals-guide";
});

goToButton.addEventListener("click", () => {
  window.location.href = "/locals-guide/";
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

buildNavigation();
buildFooter();
setCookies();
