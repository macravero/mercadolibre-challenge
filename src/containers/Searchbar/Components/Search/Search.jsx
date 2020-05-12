import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as C from 'common/constants/constants';
import styles from './Search.module.scss';

const Search = ({mLogo, sLogo, saveSearch, search, getProducts, clearApplicationState}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link onClick={clearApplicationState} className={styles.wrapper__logo} to='/'><img src={mLogo} alt={C.LANG_ES.LOGO_TITLE} /> </Link>
        <form onSubmit={getProducts} className={styles.wrapper__search_form}> 
          <input 
            className={styles.wrapper__search_form__input} 
            type="text" 
            placeholder={C.LANG_ES.SEARCHBAR_PLACEHOLDER}
            onChange={e => saveSearch(e.target.value)}
            value={search}
          />
          <button type='submit' className={styles.wrapper__search_form__submit}>
            <img src={sLogo} alt={C.LANG_ES.SEARCH} />
          </button>
        </form>
      </div>
    </div>
  );
};

Search.propTypes ={
  mLogo: PropTypes.string.isRequired,
  sLogo: PropTypes.string.isRequired,
  saveSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  getProducts: PropTypes.func.isRequired,
  clearApplicationState: PropTypes.func.isRequired
};

export default Search;
