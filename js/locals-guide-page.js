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
let localsGuideData = await fetchData("/data/locals-guides.json");

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
  image.src = `/assets/locals-guide/${currentPageData.mainImg}`;
  image.alt = currentPageData.mainAlt;
  article.prepend(image);

  // Rating
  if (currentPageData.rating) {
    const rating = document.createElement("div");
    rating.classList.add("rating");
    article.appendChild(rating);

    const container = document.createElement("div");
    rating.appendChild(container);

    const copy = document.createElement("p");
    copy.textContent = "Rating";
    container.appendChild(copy);

    const score = document.createElement("p");
    score.textContent = currentPageData.rating;
    container.appendChild(score);
  }

  thankYouBanner();

  if (currentPageData?.address?.length > 0) {
    locationInformation(locationDetails, currentPageData.address);
  }

  let recommendations = contentRecommendation(localsGuideData, currentPageData);

  recommendations.forEach((item) => {
    contentItem("h3", recommendationContainer, item);
  });
}
