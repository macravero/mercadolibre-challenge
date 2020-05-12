/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as C from 'common/constants/constants';
import Search from './Search';

configure({adapter: new Adapter()});

const MOCK_DATA = {
  mLogo: 'mercadolibre logo',
  sLogo: 'search logo',
  saveSearch: jest.fn(),
  search: '',
  getProducts: jest.fn(),
  clearApplicationState: jest.fn()
};

describe('<Search />',()=>{
  const wrapper = shallow(<Search {...MOCK_DATA} />);

  it('should render', () =>{
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it('should render a clickable logo', () =>{
    const logo = wrapper.find('img').first();
    expect(logo).toHaveLength(1);
    expect(logo.prop('src')).toEqual(MOCK_DATA.mLogo);
    expect(logo.prop('alt')).toEqual(C.LANG_ES.LOGO_TITLE);
    logo.simulate('click');
  });
  it('should render a Link that calls clearApplicationState',()=>{
    const link = wrapper.find('Link');
    expect(link.prop('to')).toEqual('/');
    link.simulate('click');
    expect(MOCK_DATA.clearApplicationState).toHaveBeenCalledTimes(1);
  });
  it('should render a form with an onSubmit method',()=>{
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit');
    expect(MOCK_DATA.getProducts).toHaveBeenCalledTimes(1);
  });
  it('should render an input with an onChange method and a value',()=>{
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input.prop('value')).toEqual(MOCK_DATA.search);
    expect(input.prop('placeholder')).toEqual(C.LANG_ES.SEARCHBAR_PLACEHOLDER);
    input.simulate('change', { target: { value: 'newSearch' } });
    expect(MOCK_DATA.saveSearch).toHaveBeenCalledTimes(1);
  });
  it('should render a button with an image that should call submit when clicked',()=>{
    const button = wrapper.find('button');
    const img = button.find('img');
    expect(button).toHaveLength(1);
    button.simulate('click');
    expect(MOCK_DATA.getProducts).toHaveBeenCalledTimes(1);
    expect(img).toHaveLength(1);
    expect(img.prop('src')).toEqual(MOCK_DATA.sLogo);
    expect(img.prop('alt')).toEqual(C.LANG_ES.SEARCH);
  });
});