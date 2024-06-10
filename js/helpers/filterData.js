export const sortByTagsAndRating = (data) => {
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
};

export const sortByRating = (data) => {
  return data.sort((a, b) => {
    if (a.rating > b.rating) return -1;
    if (a.rating < b.rating) return 1;
    return 0;
  });
};

export const sortAlphabetically = (data) => {
  return data.sort((a, b) => {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
  });
};
