import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useItemDetailsContext } from 'context/ItemDetailsContext';
import { formatCurrency } from 'common/utils/utils';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Item from './components/Item';


const ItemDetails = props => {
  const { itemDetails : {item}, loaded, saveRequest, setQuery, categoryList } = useItemDetailsContext();
  const { match: {params}} = props;
  
  useEffect(()=>{
    const { id } = params;
    if (id.trim() !== '') {
      saveRequest(true);
      setQuery(id);
    };
  },[]);

  return (
    <>
      <Breadcrumb list={categoryList} />
      { loaded && (
        <Item
          picture={item.picture}
          title={item.title}
          condition={item.condition}
          sold_quantity={item.sold_quantity}
          price={formatCurrency(item.price.currency,item.price.amount)}
          description={item.description}
        />
      )}
    </>
  );
};

ItemDetails.propTypes ={
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};
export default ItemDetails;
