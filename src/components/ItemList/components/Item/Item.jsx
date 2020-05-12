/* eslint-disable camelcase */
// because this is my data model.
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as U from 'common/utils/utils';
import {LANG_ES} from 'common/constants/constants';
import styles from './Item.module.scss';


const Item = ({product, placeholder, hasHr, getItem}) => {
  
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const { id, title, price, picture, address, free_shipping} = product;

  return (
    <Link className={styles.wrapper_link} to={`/items/${id}`} onClick={()=> getItem(id)}>
      <div className={styles.container} id={id}>
        <img 
          src={placeholder} 
          className={styles.thumbnail} 
          alt={LANG_ES.PLACEHOLDER_IMAGE} 
          style={imageIsLoading ? {} : {display: 'none'}}
        />
        <img 
          src={picture} 
          className={styles.thumbnail} 
          alt={title}
          onLoad={()=>setImageIsLoading(false)}
          style={imageIsLoading ? {display: 'none'} : {}}
        />
        <div className={styles.details_wrapper}>
          <h1 className={styles.details_wrapper__price}>
            {U.formatCurrency(price.currency,price.amount)}
            {free_shipping && <span className={styles.details_wrapper__free_shipping} />}
            <p className={styles.details_wrapper__location}>{address}</p>
          </h1>
          <p className={styles.details_wrapper__title}>{title}</p>
        </div>
      </div>
      {hasHr && <hr />}
    </Link>
  );
};

Item.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.shape({
      currency: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      decimals: PropTypes.number
    }),
    picture: PropTypes.string,
    address: PropTypes.string.isRequired,
    free_shipping: PropTypes.bool.isRequired
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  hasHr: PropTypes.bool.isRequired,
  getItem: PropTypes.func.isRequired
};

export default Item;