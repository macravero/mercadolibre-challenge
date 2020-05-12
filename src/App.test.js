
import React from 'react';
import { configure, shallow } from 'enzyme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Searchbar from 'containers/Searchbar/Searchbar';
import ItemListProvider from 'context/ItemListContext';
import ItemDetailsProvider from 'context/ItemDetailsContext';
import { preload } from 'common/utils/utils';
import App from './App';

configure({adapter: new Adapter()});

jest.mock('common/utils/utils', () =>({
  preload: jest.fn()
}));


describe('<App />', () =>{
  const wrapper = shallow(<App />);

  it('should render', () =>{
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it('should render BrowserRouter with switch and four routes', () =>{
    expect(wrapper.find(BrowserRouter)).toHaveLength(1);
    const router = wrapper.find(BrowserRouter);
    expect(router.find(Switch)).toHaveLength(1);
    expect(router.find(Route)).toHaveLength(4);
  });

  it('should render ItemDetailsProvider and ItemListProvider',() =>{
    expect(wrapper.find(ItemListProvider)).toHaveLength(1);
    expect(wrapper.find(ItemDetailsProvider)).toHaveLength(1);
  });

  it('should render Searchbar', () =>{
    expect(wrapper.find(Searchbar)).toHaveLength(1);
  });

  it('should call preload one time', () =>{
    expect(preload).toHaveBeenCalledTimes(1);
  });
});