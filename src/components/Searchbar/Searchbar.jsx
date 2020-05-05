import React from 'react';
import module from './Searchbar.module.scss';
import * as C from '../../common/constants/constants';

const Searchbar = props => {
  return (
    <div className={module.div}><input className={module.search_input}type="text" placeholder={C.LANG_ES.SEARCHBAR_PLACEHOLDER} /></div>
  );
};

export default Searchbar;
