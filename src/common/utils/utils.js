import * as R from 'ramda';
import * as S from '../selectors/selectors';

export const returnCategories = data =>{
  const POPULAR_CATEGORIES = R.pathOr([], S.POPULAR_AVAILABLE_BREADCRUMB_PATH, data).reduce((acc, val) =>{

    acc = acc.results === undefined || acc.results < val.results ? val : acc;
    return acc; 
  });;
  return [R.pathOr(POPULAR_CATEGORIES, S.DEFAULT_BREADCRUMB_PATH,data)];
};