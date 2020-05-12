import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({list}) => {
  return (
    <div className={styles.container}>
      {list.map((el,i, arr) => {
        if(arr.length -1 === i){
          return (<span key={uuidv4()}> {el} </span>);
        }
        return (<span key={uuidv4()}> {el} &gt; </span>);  
      }
      )}
    </div>
  );
};

Breadcrumb.propTypes = {
  list: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
Breadcrumb.defaultProps = {
  list: []
};


export default Breadcrumb;
