/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Item from './Item';

configure({adapter: new Adapter()});
const MOCK_DATA = {
  picture: 'itemPicture',
  title: 'itemTitle',
  condition: 'itemCondition',
  sold_quantity: 100,
  price: '$ 10.000.00',
  description: 'itemDescription',
  address: 'itemAddress'
};
describe('<Item />', () =>{
  const wrapper = mount(<Item {...MOCK_DATA} />);
  it('should render', () =>{
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
  it ('should render img with src and alt from props', () =>{
    const image = wrapper.find('img');
    expect(image.prop('src')).toEqual(MOCK_DATA.picture);
    expect(image.prop('alt')).toEqual(MOCK_DATA.title);
  });

  it ('should render a span with conditional text',()=>{
    const span = wrapper.find('span');
    wrapper.setProps({condition: 'new'});
    expect(span.text()).toEqual('Nuevo - 100 vendidos');
    wrapper.setProps({condition: 'not new'});
    expect(span.text()).toEqual(' 100 vendidos');
    wrapper.setProps({condition: 'new',sold_quantity: 5});
    expect(span.text()).toEqual('Nuevo - 5 vendidos');
  });

  it ('should render an h3 with props title', () =>{
    const title = wrapper.find('h3');
    expect(title.text()).toEqual(MOCK_DATA.title);
  });

  it ('should render an h1 with props price', () =>{
    const price = wrapper.find('h1');
    expect(price.text()).toEqual(MOCK_DATA.price);
  });

  it('should render a button', () =>{
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('Comprar');
  });

  it('should render an h2 with "Descripción del producto" and a p with product description',()=>{
    const descTitle = wrapper.find('h2');
    const desc = wrapper.find('p');
    expect(descTitle.text()).toEqual('Descripción del producto');
    expect(desc.text()).toEqual(MOCK_DATA.description);
  });

  it('should match snapshot', () =>{
    expect(wrapper).toMatchSnapshot();
  });
});