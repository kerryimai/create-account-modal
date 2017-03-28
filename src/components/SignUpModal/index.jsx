import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';
import './SignUpModal.scss';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

class SignUpModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSignUpSuccess: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    hasSubmitted: false,
  };

  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  };

  getErrors() {
    if (this.state.hasSubmitted) {
      const emailIsValid = emailRe.test(this.state.email);
      const emailLevel = emailIsValid ? 'success' : 'error';
      const emailMessage = emailIsValid ? '' : 'Email is invalid';

      let passwordLevel;
      let passwordMessage = '';
      const length = this.state.password.length;
      if (length > 12) {
        passwordLevel = 'success';
      } else if (length > 8) {

        passwordLevel = 'warning';
        passwordMessage = 'Longer passwords are more secure';
      } else {
        passwordLevel = 'error';
        passwordMessage = 'Password is too short';
      }

      return ({
        passwordLevel,
        passwordMessage,
        emailLevel,
        emailMessage,
      });
    }
    return {};
  }


  noErrors() {
    const errors = this.getErrors();
    return ( errors.emailMessage === '' && errors.passwordLevel !== 'error' )
  }

  setSubmitstate(e) {
    this.setState({
      hasSubmitted: true
    }, () => {
      if (this.noErrors()) {
        this.props.onClose();
        this.props.onSignUpSuccess({
          email: this.state.email,
          password: this.state.password
        });
      }
    })
  }

 renderForm = () => {
   const validation = this.getErrors();
    return (
    <Form horizontal className="sans-serif">
      <FormGroup validationState={validation.emailLevel}>
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl
            type="email"
            placeholder="name@xo.com"
            value={validation.email}
            onChange={this.handleChange.bind(this, 'email')}
          />
        <HelpBlock>{validation.emailMessage}</HelpBlock>
        </Col>
      </FormGroup>

      <FormGroup validationState={validation.passwordLevel}>
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl
            type="password"
            placeholder="Password"
            value={validation.password}
            onChange={this.handleChange.bind(this, 'password')}
          />
        <HelpBlock>{validation.passwordMessage}</HelpBlock>
        </Col>

      </FormGroup>

      <FormGroup className="submit-buttons">
        <Col xs={12}>

        <Button
          onClick={this.setSubmitstate.bind(this)}
          block
          bsStyle="primary"
        >
          Sign Up
        </Button>
      </Col>
      </FormGroup>
    </Form>
  )};

  render() {
    return (
      <Modal className="sign-up-modal" show={this.props.open} onHide={this.props.onClose} style={{paddingLeft: 0}}>
        <Modal.Header closeButton>
          <Modal.Title className="cursive">
            Create Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cursive">
            <p>Hi there!</p>
            <p>You’re only one step away from crafting your own unique wedding experience.</p>
          </div>
          {this.renderForm()}
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    );
  }
}

export default SignUpModal;
