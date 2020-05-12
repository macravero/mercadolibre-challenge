// for datamodel shape
/* eslint-disable camelcase */

import * as R from 'ramda';
import * as S from '../selectors/selectors';

export const stringifyByKey = (data, key) =>{
  const newArr = [];
  if(!data.length){
    newArr.push(data.name);
  } else {
    data.forEach(el =>{
      newArr.push(el[key]);
    });
  } 
  return newArr;
};

export const categoryParser = data =>{
  if (R.hasPath([S.SINGLE_ITEM_BREADCRUMB_PATH],data)) return stringifyByKey(R.path([S.SINGLE_ITEM_BREADCRUMB_PATH],data),'name');
  if (!data.results.length) return ['No se han encontrado resultados :('];
  const POPULAR_CATEGORIES = R.pathOr([], S.POPULAR_AVAILABLE_BREADCRUMB_PATH, data).reduce((acc, val) =>{

    acc = acc.results === undefined || acc.results < val.results ? val : acc;
    return acc; 
  });
  return stringifyByKey(R.pathOr(POPULAR_CATEGORIES, S.DEFAULT_BREADCRUMB_PATH,data),'name');
};

export const setDecimals = currencyId =>{
  switch(currencyId){
  case 'ARS':
    return 2;
  default:
    return 2;
  }
};

export const itemListParser = data => {
  if(!data.length) return [];
  const itemList = [];
  data.forEach(el =>{
    const item = {};
    item.id = el.id;
    item.title = el.title;
    item.price = {
      currency: el.currency_id,
      amount: el.price,
      decimals: setDecimals(el.currency_id)
    };
    item.picture = el.thumbnail;
    item.condition = el.condition;
    item.free_shipping = el.shipping.free_shipping;
    // This is not part of the data model requested but I need it in the design.
    item.address = el.address.state_name;
    itemList.push(item);
  });
  return itemList;
};

export const itemParser = (data, desc) => {
  const item = {};
  const { id,title,currency_id,price,pictures,condition,shipping,sold_quantity } = data;
  item.id = id;
  item.title = title;
  item.price = {
    currency: currency_id,
    amount: price,
    decimals: setDecimals(currency_id)
  };
  item.picture = pictures[0].url;
  item.condition = condition;
  item.free_shipping = shipping.free_shipping;
  item.sold_quantity = sold_quantity;
  item.description = desc;
  return item;
};

export const formatCurrency = (currencyId, amount = 0) =>{
  const intl = {};
  switch (currencyId){
  case 'ARS':
    // leaving references as possible formatter use.
    // intl.lang = 'es-AR';
    // intl.currency = 'ARS';
    intl.symbol = '$';
    intl.decimals = 2;
    break;
  default:
    // intl.lang = 'en-US';
    // intl.currency = 'USD';
    intl.symbol = '$';
    intl.decimals = 0;
    break;
  }
  // intl formatter doesnt give me the expected outcome but its an option to keep in mind
  // const formatter = new Intl.NumberFormat(intl.lang, {
  //   style: 'currency',
  //   currency: intl.currency,
  //   minimumFractionDigits: 0
  // });
  return `${intl.symbol} ${amount.toFixed(intl.decimals).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
};

// This is just a suggestion for preloading multiple assets from the site. Fixed by server side rendering I guess.
// export const bulkPreloader = imageArray =>{
//   imageArray.forEach(image => {
//     const img = new Image();
//     img.src = image;
//   });
// };

export const preload = imageSource =>{
  const img = new Image();
  img.src = imageSource;
};