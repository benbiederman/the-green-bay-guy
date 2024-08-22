import { buildNavigation } from "./component/header.js";
import { buildFooter } from "./component/footer.js";
import { fetchData } from "./helpers/fetchData.js";
import { thankYouBanner } from "./component/thank-you-banner.js";
import { locationInformation } from "./component/locationInformation.js";
import { contentRecommendation } from "./helpers/contentRecommendation.js";
import { contentItem } from "./component/contentItem.js";
const locationDetails = document.querySelector(".location-details");

buildNavigation();

// Fetch data
let localsGuideData = await fetchData("/data/content.json");

// Assign current page data
let path = window.location.pathname;
let currentPageData = localsGuideData.find((guide) => path.includes(guide.url));

// Generate main image, rating, locations, and recommended articles
generatePageInformation();

buildFooter();

function generatePageInformation() {
  const article = document.querySelector(".article");
  const recommendationContainer = document.querySelector(
    ".article-recommendation"
  );

  // Image
  const image = document.createElement("img");
  image.src = `/assets/podcast/${currentPageData.mainImg}`;
  image.alt = currentPageData.mainAlt;
  article.prepend(image);

  // Audio
  if (currentPageData.audio) {
    const audio = document.createElement("audio");
    audio.controls = true;
    article.appendChild(audio);

    const audioSource = document.createElement("source");
    audioSource.src = `/assets/audio/${currentPageData.audio}.wav`;
    audio.appendChild(audioSource);
  }

  thankYouBanner();

  let recommendations = contentRecommendation(localsGuideData, currentPageData);

  recommendations.forEach((item) => {
    contentItem("h3", recommendationContainer, item);
  });
}
