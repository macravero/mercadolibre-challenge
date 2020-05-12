import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as ItemDetailsContext from 'context/ItemDetailsContext';
import ItemDetails from './ItemDetails';

configure({adapter: new Adapter()});


describe('<ItemDetails />',()=>{
  it('should mock the context', ()=>{
    const contextValues = {
      itemDetails: {
        item: {
          picture: 'itemPicture',
          title: 'itemTitle',
          condition: 'itemCondition',
          sold_quantity: 100,
          price:{
            currencyId: 'ARS',
            amount: 10000
          },
          description: 'itemDescription'
        }
      },
      loaded: jest.fn(),
      saveRequest: jest.fn(),
      setQuery: jest.fn(),
      categoryList: ['first','second']
    };
    const MOCK_MATCH = {
      params: {
        id: 'matchID'
      }
    };
    const CORRECT_ITEM_PROPS = {
      picture: 'itemPicture',
      title: 'itemTitle',
      condition: 'itemCondition',
      sold_quantity: 100,
      price: '$ 10.000.00',
      description: 'itemDescription'
    };

    jest
      .spyOn(ItemDetailsContext, 'useItemDetailsContext')
      .mockImplementation(()=> contextValues);
    const wrapper = shallow(<ItemDetails match={MOCK_MATCH} />);
    expect(wrapper.isEmptyRender()).toEqual(false);
    expect(wrapper.find('Item')).toHaveLength(1);
    expect(wrapper.find('Item').props()).toEqual(CORRECT_ITEM_PROPS);
  });
});