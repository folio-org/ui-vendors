import { isEmpty, isNil } from 'lodash';

// CatIDToLabel
const CatIDToLabel = (data, catItems) => {
  if (isEmpty(data) || isNil(catItems)) return data;
  const newData = data.map((item) => {
    if (isNil(item)) return '';
    for (const key in catItems) {
      if (item === catItems[key].id) return catItems[key].value;
    }
    return item;
  });
  return newData.join(', ');
};

export default CatIDToLabel;
