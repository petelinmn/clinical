import fields from './fields.json'
import { IDataItem } from './Types'

const baseUrl: string = 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search';
const BRIEF_DATA_FIELDS: number[] = [0,1,2,3,4,39];

enum FetchType {
  breif,
  full
}

interface RequestInfo {
  searchString: string,
  fetchType: FetchType,
  maxList: number
}

const mapDataToFields = (data: any[], fetchType: FetchType = FetchType.breif): IDataItem[][] =>
  data.map((dataItem) =>
    dataItem.map((item: any, index: number) => {
      const field = fetchType === FetchType.breif
        ? fields[BRIEF_DATA_FIELDS[index]]
        : fields[index];

      return {
        name: field.name,
        caption: field.caption,
        value: item
      };
  }));

const fetchData = async (
  request: RequestInfo
): Promise<any> => {
  const df: string = `&df=${fields
    .filter((_, index) => request.fetchType === FetchType.full || BRIEF_DATA_FIELDS.includes(index))
    .map(item => item.name)
    .reduce((acc, curItem) => acc + ',' + curItem)}`;

  const response = await fetch(`${baseUrl}?maxList=${request.maxList}&terms=${request.searchString}${df}`);
  const result = await response.json();
  return result[3];
}

const fetchCardData = async (searchString: string): Promise<IDataItem[]> => {
  const data = await fetchData({ searchString, fetchType: FetchType.full, maxList: 1 });
  return mapDataToFields(data, FetchType.full)[0];
}

const fetchListData = async (searchString: string, maxList: number): Promise<IDataItem[][]> => {
  const data = await fetchData({ searchString, fetchType: FetchType.breif, maxList });
  return mapDataToFields(data, FetchType.breif);
}

export {
  fetchCardData,
  fetchListData
};
