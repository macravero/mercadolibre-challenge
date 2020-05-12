// product amount sliced from request
export const ITEM_AMOUNT = 4;
// Debounce wait time to avoid request spam.
export const DEBOUNCE_DELAY = 500;
export const AUTHOR = {
  name: 'Martin',
  lastname: 'Cravero'
};
export const LANG_ES = {
  SEARCHBAR_PLACEHOLDER: 'Nunca dejes de buscar',
  BUY: 'Comprar',
  NEW: 'Nuevo',
  SOLD: 'vendidos',
  PRODUCT_DESCRIPTION: 'descripción del producto',
  // accessibility and SEO variables.
  NORMALIZED_DELIVERY: 'Entrega con normalidad',
  SEARCH: 'Buscar',
  LOGO_TITLE: 'Logo MercadoLibre',
  PLACEHOLDER_IMAGE: 'Imagen por defecto'
};
export const ENDPOINTS = {
  BASE: 'https://api.mercadolibre.com/',
  SEARCH_BY_QUERY: 'sites/MLA/search?q=',
  SEARCH_BY_ID: 'items/',
  DESCRIPTION: '/description'
};
export const QUERY_PARAMS = {
  SEARCH_BY_QUERY: '/items?search='
};