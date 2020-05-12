import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as C from 'common/constants/constants';
import mLogo from 'assets/logo_ml_2x.png';
import sLogo from 'assets/search_2x.png';
import { ItemListContext } from 'context/ItemListContext';
import Search from './Components/Search/Search';


const Searchbar = props => {

  const {history:{push}} = props;
  const { setQuery, saveRequest} = useContext(ItemListContext);
  const [search, saveSearch] = useState('');
  
  const getProducts = e => {
    e.preventDefault();
    if (search.trim() === '') return;
    saveRequest(true);
    setQuery(search);
    push({pathname:`${C.QUERY_PARAMS.SEARCH_BY_QUERY}${search}`});
    saveSearch('');
  };
  
  const clearApplicationState = () =>{
    saveSearch('');
    setQuery('');
    saveRequest(false);
  };

  return (
    <Search
      mLogo={mLogo}
      sLogo={sLogo}
      saveSearch={saveSearch}
      search={search}
      getProducts={getProducts}
      clearApplicationState={clearApplicationState}
    />
  );
};

Searchbar.propTypes ={
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Searchbar);
