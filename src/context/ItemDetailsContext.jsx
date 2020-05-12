import React, {createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ENDPOINTS, AUTHOR } from 'common/constants/constants';
import { itemParser, categoryParser } from 'common/utils/utils';

export const ItemDetailsContext = createContext();

export const useItemDetailsContext = () => useContext(ItemDetailsContext);

const ItemDetailsProvider = ({children}) => {

  const [itemDetails, setItemDetails] = useState([]);
  const [query, setQuery] = useState('');
  const [request, saveRequest] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() =>{
    if (request){
      setLoaded(false);
      const getItemData = async () =>{
        const url = ENDPOINTS.BASE + ENDPOINTS.SEARCH_BY_ID + query;
        const res = await axios.get(url);
        const desc = await axios.get(`${url}/description`);
        const { data } = res; 
        const { data: {plain_text: plainText} } = desc;
        let categories = await axios.get(`${ENDPOINTS.BASE}categories/${data.category_id}`);
        categories = categoryParser(categories.data);
        categories.push(data.title);
        const parsed = {
          author: {
            ...AUTHOR
          },
          item: itemParser(data, plainText)
        };
        setItemDetails(parsed);
        setLoaded(true);
        setCategoryList(categories);
      };
      getItemData();
    }
  }, [query]);

  return (
    <ItemDetailsContext.Provider
      value={{
        setQuery,
        saveRequest,
        itemDetails,
        loaded,
        categoryList
      }}
    >
      {children}
    </ItemDetailsContext.Provider>
  );
};

// prop validation
ItemDetailsProvider.propTypes ={
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
export default ItemDetailsProvider;
