/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Item.module.scss';

const Item = props => {

  const { picture, title, condition, sold_quantity, price, description } = props;
  return (
    <div className={styles.container}>
      <div className={styles.container__row}>
        <img src={picture} alt={title} />
        <div className={styles.container__row__item_details}>
          <span>{condition === 'new' && 'Nuevo -'} {sold_quantity} vendidos</span>
          <h3>{title}</h3>
          <h1>{price}</h1>
          <button type='button'>Comprar</button>
        </div>
      </div>
      <div className={styles.container__row}>
        <div className={styles.container__row__description_wrapper}>
          <h2>Descripción del producto</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

Item.propTypes ={
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  sold_quantity: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Item;
