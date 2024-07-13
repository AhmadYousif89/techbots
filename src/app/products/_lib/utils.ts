import { Category, SearchParams, SortValue } from './types';

export function extractSearchParams(
  searchParams: SearchParams | IterableIterator<[string, string]>,
  customLimit = '8'
) {
  let params: { [key: string]: any } = {};

  if (Symbol.iterator in Object(searchParams)) {
    for (const [key, value] of searchParams as IterableIterator<[string, string]>) {
      params[key] = value;
    }
  } else {
    params = searchParams;
  }

  const result = {
    page: '1',
    limit: customLimit,
    category: '' as Category,
    sort: '' as SortValue,
    grid: '4',
    selectedRating: '',
    min: '',
    max: ''
  };
  type Result = typeof result;

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      result[key as keyof Result] = params[key];
    }
  }

  return result;
}