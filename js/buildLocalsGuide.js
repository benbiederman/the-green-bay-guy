export function buildLocalsGuide(heading, container, item) {
  let screenYheight = window.innerHeight;
  let path = window.location.pathname;

  let contentType = item?.auto ? "podcast" : "locals-guide";

  //   Create article container
  const article = document.createElement("article");
  article.classList.add("locals-guide-article");
  article.tabIndex = 0;
  article.ariaLabel = `${item.title}, ${
    item.rating ? item.rating + " rating" : ""
  }, ${item.distance ? item.distance + " miles from Lambeau Field" : ""}`;
  container.appendChild(article);
  let itemYPosition = article.getBoundingClientRect().y;

  if (item.rating) {
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("locals-guide-rating");

    const rating = document.createElement("p");
    rating.textContent = item.rating;
    ratingContainer.appendChild(rating);
    article.appendChild(ratingContainer);
  }

  // Add Image
  const img = document.createElement("img");
  if (path.includes("drink") && item.secondaryImg) {
    img.src = `../assets/${contentType}/${item.secondaryImg}`;
    img.alt = item.secondaryAlt;
  } else {
    img.src = `../assets/${contentType}/${item.mainImg}`;
    img.alt = item.mainAlt;
  }
  img.width = "400";
  img.height = "250";
  if (itemYPosition > screenYheight) {
    img.loading = "lazy";
  }
  article.appendChild(img);

  const articleInformation = document.createElement("div");
  articleInformation.classList.add("article-information");
  article.appendChild(articleInformation);

  if (item.tags) {
    const articleTags = document.createElement("div");
    articleTags.classList.add("article-tags");
    articleInformation.appendChild(articleTags);

    item.tags.forEach((tag) => {
      const articleTag = document.createElement("div");
      articleTag.classList.add("article-tag");
      articleTag.style.backgroundColor = generateTagColor(tag);

      const tagCopy = document.createElement("span");
      tagCopy.textContent = tag;
      articleTag.appendChild(tagCopy);

      articleTags.appendChild(articleTag);
    });
  }

  const title = document.createElement(heading);
  title.textContent = item.title;
  articleInformation.appendChild(title);

  const hr = document.createElement("hr");
  articleInformation.appendChild(hr);

  const moreInfo = document.createElement("p");
  if (contentType === "podcast") {
    moreInfo.textContent = `Listen to episode ${item.episodeNumber} now`;
  } else {
    if (item.distance) {
      moreInfo.textContent = `${item.distance} miles from Lambeau Field`;
    } else {
      moreInfo.textContent = "Read more";
    }
  }
  articleInformation.appendChild(moreInfo);

  // Content Item handlers
  article.addEventListener("click", (e) => {
    window.location.href = `/${contentType}/${item.url}.html`;
  });

  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      window.location.href = `/${contentType}/${item.url}.html`;
    }
  });
}

function generateTagColor(tag) {
  switch (tag) {
    case "$$$":
      return "#9A3737";
    case "Activity":
      return "#056071";
    case "Alcohol":
      return "#000";
    case "Breakfast":
      return "#056071";
    case "Coffee":
      return "#684431";
    case "Dessert":
      return "#60063F";
    case "Dinner":
      return "#9A3737";
    case "Free":
      return "#35532D";
    case "Guide":
      return "#595959";
    case "Lunch":
      return "#943B00";
    case "Shopping":
      return "#943B00";
    case "Fan":
      return "#056071";
    case "Player":
      return "#35532D";
    default:
      return "#000";
  }
}
