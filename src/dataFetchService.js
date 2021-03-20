import fields from './fields.json'

const baseUrl = 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search';
const FIELD_SETS = {
  BRIEF_SET: [0,1,2,3,4,39],
  ALL_FIELDS: []
}

const mapDataToFields = (data, fieldSet = FIELD_SETS.BRIEF_SET) => data.map((item, index) => {
  const field = fieldSet === FIELD_SETS.BRIEF_SET
    ? fields[fieldSet[index]]
    : fields[index];

  return {
    name: field.name,
    caption: field.caption,
    value: item
  };
});

const fetchData = (searchString, fieldSet, maxList = 1) => new Promise((resolve, reject) => {
  const df = `&df=${fields
    .filter((_, index) => fieldSet.length === 0 || fieldSet.includes(index))
    .map(item => item.name)
    .reduce((acc, curItem) => acc + ',' + curItem)}`;

  fetch(`${baseUrl}?maxList=${maxList}&terms=${searchString}${df}`)
  .then(response => response.json().then(result => {
    let data = result[3];
    if (fieldSet === FIELD_SETS.ALL_FIELDS) {
      data = mapDataToFields(data[0], fieldSet);
    }

    resolve(data);
  }))
  .catch(error => reject(error))
});

const fetchCardData = (searchString, maxList) =>
  fetchData(searchString, FIELD_SETS.ALL_FIELDS, maxList);

const fetchListData = (searchString, maxList) =>
  fetchData(searchString, FIELD_SETS.BRIEF_SET, maxList);

export {
  fetchCardData,
  fetchListData
};
