import React, {createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {ITEM_AMOUNT, ENDPOINTS, AUTHOR } from 'common/constants/constants';
import { categoryParser, itemListParser } from 'common/utils/utils';

export const ItemListContext = createContext();


export const useItemListContext = () => useContext(ItemListContext);

const ItemListProvider = (props) => {
  const [itemList, setItemList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [query, setQuery] = useState('');
  const [request, saveRequest] = useState(false);
  const {children} = props;

  useEffect(()=>{
    const {location:{search: urlSearch }, history:{push}} = props;
    const initSearch = 
  urlSearch.includes('?search=')
    ? 
    urlSearch.substring(urlSearch.indexOf('=') + 1) :
    '';
    if(initSearch !== '') {
      saveRequest(true);
      setQuery(initSearch);
      push({pathname:`/items?search=${initSearch}`});
    };
  },[]);
  
  useEffect(() =>{
    if (request){
      setItemList([]);
      const getItems = async () =>{
        const url = ENDPOINTS.BASE + ENDPOINTS.SEARCH_BY_QUERY + query;
        const res = await axios.get(url);
        const parsed = {
          author: {
            ...AUTHOR
          },
          categories: categoryParser(res.data),
          items: itemListParser(res.data.results.slice(0,ITEM_AMOUNT))
        };
        setItemList(parsed.items);
        setCategoryList(parsed.categories);
      };
      getItems();
    }
  }, [query]);

  return (
    <ItemListContext.Provider
      value={{
        setQuery,
        saveRequest,
        itemList,
        categoryList
      }}
    >
      {children}
    </ItemListContext.Provider>
  );
};

ItemListProvider.propTypes ={
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default withRouter(ItemListProvider);
