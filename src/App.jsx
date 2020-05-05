import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Searchbar from './components/Searchbar/Searchbar';
import * as U from './common/utils/utils';
import {ITEM_AMOUNT} from './common/constants/constants';
import module from './App.module.scss';

function App() {
  const [query, setQuery] = useState('cuchillo');
  const [items, setItems] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
  	const fetchData = async () => {
    	const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
      const crumb = U.returnCategories(response.data);
      setBreadcrumb(crumb);
      setItems(response.data.results.slice(0,ITEM_AMOUNT));
    };
    fetchData();
  }, [query]);
  return (
    <div className={module.div}>
      <Searchbar></Searchbar>
      <div>{breadcrumb.map((el,i, arr) => {
        if(arr.length -1 === i){
          return (<span key={el.name}> {el.name} </span>);
        }
        return (<span key={el.name}> {el.name} &gt; </span>);  
      }
      )}
      </div>
      {items.map(el => <div key={el.id} id={el.id}>{el.title}</div>)}
    </div>
  );
}

export default App;
