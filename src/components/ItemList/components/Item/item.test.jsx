/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Item from './Item';

configure({adapter: new Adapter()});

const setState = jest.fn();

const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, setState]);

const MOCK_DATA = {
  product:{
    id: 'productId',
    picture: 'itemPicture',
    title: 'itemTitle',
    condition: 'itemCondition',
    sold_quantity: 100,
    price: {
      amount: 10000,
      currency: 'ARS',
      decimals: 2
    },
    free_shipping: true,
    description: 'itemDescription',
    address: 'itemAddress'
  },
  placeholder: 'placeholder',
  hasHr: true,
  getItem: jest.fn()
};
describe('<Item />', () =>{
  const wrapper = shallow(<Item {...MOCK_DATA} />);
  it('should render', () =>{
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
  it ('should render img with src and alt from props', () =>{
    const placeholder = wrapper.find('img').first();
    const productImg = wrapper.find('img').last();
    expect(placeholder.prop('src')).toEqual(MOCK_DATA.placeholder);
    expect(productImg.prop('src')).toEqual(MOCK_DATA.product.picture);
  });

  it ('should render a clickable container',()=>{
    const link = wrapper.find('Link');
    expect(link).toHaveLength(1);
    expect(link.prop('to')).toEqual('/items/productId');
    link.simulate('click');
    expect(MOCK_DATA.getItem).toHaveBeenCalledTimes(1);
  });

  it ('should render a span conditionally',()=>{
    const falseShipping = {
      ...MOCK_DATA,
      product:{
        id: 'productId',
        picture: 'itemPicture',
        title: 'itemTitle',
        condition: 'itemCondition',
        sold_quantity: 100,
        price: {
          amount: 10000,
          currency: 'ARS',
          decimals: 2
        },
        free_shipping: false,
        description: 'itemDescription',
        address: 'itemAddress'
      }
    };
    expect(wrapper.find('span')).toHaveLength(1);
    wrapper.setProps({...falseShipping});
    expect(wrapper.find('span')).toHaveLength(0);
    wrapper.setProps({...MOCK_DATA});
    expect(wrapper.find('span')).toHaveLength(1);
  });

  it('should render a location', () =>{
    const location = wrapper.find('p').first();
    expect(location).toHaveLength(1);
    expect(location.text()).toEqual(MOCK_DATA.product.address);
  });

  it('should render a title', () =>{
    const title = wrapper.find('p').last();
    expect(title).toHaveLength(1);
    expect(title.text()).toEqual(MOCK_DATA.product.title);
  });

  it('should conditionally render an <hr />',()=>{
    const noHR = {
      ...MOCK_DATA,
      hasHr: false
    };
    expect(wrapper.find('hr')).toHaveLength(1);
    wrapper.setProps({...noHR});
    expect(wrapper.find('hr')).toHaveLength(0);
    wrapper.setProps({...MOCK_DATA});
    expect(wrapper.find('hr')).toHaveLength(1);
  });

  it('should match snapshot', () =>{
    expect(wrapper).toMatchSnapshot();
  });
});