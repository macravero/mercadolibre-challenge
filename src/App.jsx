/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Searchbar from 'containers/Searchbar/Searchbar';
import ItemList from 'components/ItemList/ItemList';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import ItemDetails from 'containers/ItemDetails/ItemDetails';
import ItemListProvider from 'context/ItemListContext';
import ItemDetailsProvider from 'context/ItemDetailsContext';
import { preload } from 'common/utils/utils';
import placeholder from 'assets/placeholder.png';
import styles from './App.module.scss';

function App() {
  preload(placeholder);
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <ItemListProvider>
          <ItemDetailsProvider>
            <Searchbar />
            <Switch>
              <Route
                exact 
                path='/items?:search'
                render={(props) =><ItemList {...props} placeholder={placeholder} />} 
              />
              <Route
                exact
                path='/items/:id'
                render={(props) =><ItemDetails {...props} placeholder={placeholder} />}
              />
              <Route
                exact
                path="/"
                // small hack to avoid rendering an empty homepage. A homepage could be useful but only searchbar was provided as a consistent element.
                render={()=> <></>}
              />
              <Route
                exact
                path="/*"
                render={()=><PageNotFound />}
              />
            </Switch>
          </ItemDetailsProvider>
        </ItemListProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
