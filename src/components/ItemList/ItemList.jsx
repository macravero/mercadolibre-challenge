import React from 'react';
import PropTypes from 'prop-types';
import { useItemListContext } from 'context/ItemListContext';
import { useItemDetailsContext } from 'context/ItemDetailsContext';
import Item from './components/Item/Item';
import styles from './ItemList.module.scss';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const ItemList = (props) => {
  const { itemList, categoryList } = useItemListContext();
  const { setQuery, saveRequest } = useItemDetailsContext();
  
  const getItem = id =>{
    saveRequest(true);
    setQuery(id);
  };
  
  return (
    <>
      <Breadcrumb list={categoryList} />
      <div className={styles.container}>
        {itemList.map((el, i) => <Item getItem={getItem} key={el.id} product={el} placeholder={props.placeholder} hasHr={i !== itemList.length-1} />)}
      </div>
    </>
  );
};

ItemList.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default ItemList;
