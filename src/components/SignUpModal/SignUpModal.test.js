import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SignUpModal from './index.jsx';
import { Modal } from 'react-bootstrap';

const noop = () => {};
describe('<SignUpModal />', () => {
  let modal;
  let wrapper;
  let container;
  let onSignUpSuccessMock;
  beforeEach(() => {
    onSignUpSuccessMock = jest.fn();
    container = document.createElement('div');
    wrapper = ReactDOM.render(
      <SignUpModal open onClose={noop} onSignUpSuccess={onSignUpSuccessMock}/>,
      container
    );
    modal = document.getElementsByClassName('sign-up-modal');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  })

  it('renders the title', () => {
    const title = document.getElementsByClassName('modal-title');
    expect(title).toHaveLength(1);

    expect(title[0].textContent).toEqual("Create Account");
  });

  it('renders sign up form', () => {
    const form = document.getElementsByClassName('form-horizontal');
    expect(form[0].childNodes).toHaveLength(3);
    expect(form[0].childNodes[0].textContent).toEqual("Email")
    expect(form[0].childNodes[1].textContent).toEqual("Password")
  });

  it('validates user email when submit', (done) => {
    wrapper.setState({
      email: 'invalid@email',
      password: 'goodpassword'
    }, () => {
      const errorNode = document.getElementsByClassName('has-error');
      expect(errorNode).toHaveLength(0)
      wrapper.setState({
        hasSubmitted: true
      }, () => {
        const errorNode = document.getElementsByClassName('has-error');
        expect(errorNode).toHaveLength(1)
        done();
      });
    });
  });

  it('validates user password when submit', (done) => {
    wrapper.setState({
      email: 'good@email.com',
      password: 'badpw',
    }, () => {
      const errorNode = document.getElementsByClassName('has-error');
      expect(errorNode).toHaveLength(0)
      wrapper.setState({
        hasSubmitted: true
      }, () => {
        const errorNode = document.getElementsByClassName('has-error');
        expect(errorNode).toHaveLength(1)
        done();
      });
    });
  });

  it('calls succesfulSubmit prop when button is clicked', (done) => {
    const state = {
      email: 'good@email.com',
      password: 'goodpassword'
    }
    wrapper.setState(state, () => {
      const button = document.getElementsByClassName('btn')[0];
      TestUtils.Simulate.click(button);
      setTimeout( () => {
        expect(onSignUpSuccessMock.mock.calls).toHaveLength(1);
        expect(onSignUpSuccessMock.mock.calls[0][0]).toEqual(state);
        done();
      })
    })
  })
});
