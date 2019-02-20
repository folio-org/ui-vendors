import { isEmpty } from 'lodash';

// CatIDToLabel
const CatIDToLabel = (data, catItems) => {
  if (isEmpty(data) && isEmpty(catItems)) return data;
  const newData = data.map((item) => {
    if (isEmpty(item.categories)) return item;
    const arr = [];
    item.categories.forEach(cat => {
      for (const key in catItems) {
        if (cat === catItems[key].value) {
          arr.push(catItems[key]);
        }
      }
      return false;
    });
    item.categories = arr;
    return item;
  });
  return newData;
};

export default CatIDToLabel;
