export function contentRecommendation(allData, pageData) {
  let filteredData;
  if (pageData.rating) {
    filteredData = allData.filter((item) => {
      return item.tags.some(
        (tag) =>
          pageData.tags.includes(tag) &&
          pageData.title !== item.title &&
          item.rating > 3.9
      );
    });
  } else {
    filteredData = allData.filter((item) => {
      return item.tags.some(
        (tag) => pageData.tags.includes(tag) && pageData.title !== item.title
      );
    });
  }

  if (filteredData.length < 4) {
    return filteredData;
  }
  return getRandomItems(filteredData);
}

// Randomize array of filteredData
function getRandomItems(filteredData) {
  let clonedArr = filteredData;

  for (let i = clonedArr.length - 1; i > 0; i--) {
    const num = Math.floor(Math.random() * (i + 1));
    [clonedArr[i], clonedArr[num]] = [clonedArr[num], clonedArr[i]];
  }

  return clonedArr.slice(0, 4);
}
