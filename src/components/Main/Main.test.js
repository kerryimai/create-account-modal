import React from 'react';
import { shallow } from 'enzyme';

import Main from './index';
import { Button } from 'react-bootstrap';

const noop = () => {};
describe('<SignUpModal />', () => {
  it('renders the sign up button', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
