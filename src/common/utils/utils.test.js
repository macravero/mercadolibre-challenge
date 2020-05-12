import { stringifyByKey, categoryParser, setDecimals, itemListParser, itemParser, formatCurrency } from './utils';
// STRINGIFYBYKEY
test('stringifyByKey ARR equals RES', () =>{
  const ARR = [
    {
      id: 1,
      name: 'first'
    },
    {
      id: 2,
      name: 'second'
    }
  ];
  const RES = ['first','second'];
  expect(stringifyByKey(ARR,'name')).toStrictEqual(RES);
});

test('stringifyByKey SINGLE_ITEM equals RES', () =>{
  const SINGLE_ITEM = {
    id: 1,
    name: 'first'
  };
  const RES =['first'];
  expect(stringifyByKey(SINGLE_ITEM,'name')).toEqual(RES);
});

// CATEGORYPARSER

test('categoryParser should parse DATA to array of strings in shape of RES', () =>{
  const PATH_ROOT = {
    path_from_root: [
      {id: '1', name: 'first'},
      {id: '2', name: 'second'},
      {id: '3', name: 'third'}
    ]
  };
  const PATH_ROOT_RES = ['first','second','third'];
  
  expect(categoryParser(PATH_ROOT)).toEqual(PATH_ROOT_RES);

  const AVAILABLE_FILTERS = {
    available_filters:[
      {
        id:'category',
        values:[
          {id: '1', name: 'first', amount: 50},
          {id: '2', name: 'second', amount: 25},
          {id: '3', name: 'third', amount: 120}
        ]
      }
    ],
    results: ['1','2','3']
  };
  const AVAILABLE_FILTERS_RES = ['third'];

  expect(categoryParser(AVAILABLE_FILTERS)).toEqual(AVAILABLE_FILTERS_RES);

  const NO_RESULTS = {
    available_filters:[
      {
        id:'category',
        values:[
          {id: '1', name: 'first', amount: 50},
          {id: '2', name: 'second', amount: 25},
          {id: '3', name: 'third', amount: 120}
        ]
      }
    ],
    results: []
  };
  const NO_RESULTS_RES = ['No se han encontrado resultados :('];

  expect(categoryParser(NO_RESULTS)).toEqual(NO_RESULTS_RES);

  const DEFAULT_PATH = {
    filters:[
      {
        id:'category',
        values:[
          {id: '1', name: 'filters', path_from_root:[
            {id: '2', name: 'second', amount: 25},
            {id: '3', name: 'third', amount: 120}
          ]}
        ]
      }
    ],
    available_filters:[
      {
        id:'category',
        values:[
          {id: '1', name: 'first', amount: 50},
          {id: '2', name: 'second', amount: 25},
          {id: '3', name: 'third', amount: 120}
        ]
      }
    ],
    results: ['1','2','3']
  };
  const DEFAULT_PATH_RES = ['second','third'];

  expect(categoryParser(DEFAULT_PATH)).toEqual(DEFAULT_PATH_RES);

});

// SET DECIMALS

test('setDecimals with ARS should return 2', () =>{
  expect(setDecimals('ARS')).toBe(2);
});
test('setDecimals with no value should default return 2', ()=>{
  expect(setDecimals()).toBe(2);
});

// ITEM LIST PARSER
test('itemListParser should parse data into shape of res', () =>{
  const DATA = [
    {
      id: 1,
      title: 'first',
      currency_id: 'ARS',
      price: 1111,
      thumbnail:'firstThumb',
      condition:'new',
      shipping:{
        free_shipping:true
      },
      address:{
        state_name:'Chubut'
      }
    },
    {
      id: 2,
      title: 'second',
      currency_id: 'ARS',
      price: 2222,
      thumbnail:'secondThumb',
      condition:'used',
      shipping:{
        free_shipping:false
      },
      address:{
        state_name:'Buenos Aires'
      }
    }
  ];
  const RES = [
    {
      id: 1,
      title: 'first',
      price: {
        currency: 'ARS',
        amount: 1111,
        decimals: 2
      },
      picture: 'firstThumb',
      condition: 'new',
      free_shipping: true,
      address:'Chubut'
    },
    {
      id: 2,
      title: 'second',
      price: {
        currency: 'ARS',
        amount: 2222,
        decimals: 2
      },
      picture: 'secondThumb',
      condition: 'used',
      free_shipping: false,
      address:'Buenos Aires'
    }
  ];
  expect(itemListParser(DATA)).toEqual(RES);
});

test('itemListParser should return [] if data is empty', () =>{
  const DATA = [];
  const RES = [];
  expect(itemListParser(DATA)).toEqual(RES);
});

// ITEM PARSER

test('itemParser should parse data into shape of res', () =>{
  const DATA = {
    id: 1,
    title: 'first',
    currency_id: 'ARS',
    price: 1111,
    pictures:[
      {
        id:1,
        url:'first'
      },
      {
        id:2,
        url:'second'
      }
    ],
    condition:'new',
    shipping:{
      free_shipping:true
    },
    sold_quantity: 200
  };
  const DESC = 'item desc';
  const RES = {
    id: 1,
    title: 'first',
    price:{
      currency: 'ARS',
      amount: 1111,
      decimals: 2
    },
    picture: 'first',
    condition:'new',
    free_shipping:true,
    sold_quantity: 200,
    description:'item desc'
  };
  expect(itemParser(DATA,DESC)).toEqual(RES);
});

// FORMAT CURRENCY

test('formatCurrency with ARS and 10000 should return $ 10.000.00',()=>{
  expect(formatCurrency('ARS',10000)).toEqual('$ 10.000.00');
});

test('formatCurrency with no values should return a default case',()=>{
  expect(formatCurrency()).toEqual('$ 0');
});
