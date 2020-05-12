import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageNotFound from './PageNotFound';

configure({adapter: new Adapter()});

describe('<PageNotFound />', () =>{
  const wrapper = shallow(<PageNotFound />);

  it('should render', () =>{
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it('should render a p element with the paragraph "Pagina no encontrada :(" ', () =>{
    const p = wrapper.find('p');
    expect(p).toHaveLength(1);
    expect(p.text()).toEqual('Pagina no encontrada :(');
  });

  it('should match snapshot', () =>{
    expect(wrapper).toMatchSnapshot();
  });
});