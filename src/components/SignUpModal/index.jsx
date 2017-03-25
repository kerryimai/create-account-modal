import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';


const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

class SignUpModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setSuccessMsg: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    hasSubmitted: false,
  };

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePwChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  setErrorState() {
    if (this.state.hasSubmitted) {
      console.log("Set error")
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
    const errors = this.setErrorState();
    return ( errors.emailMessage === '' && errors.passwordLevel !== 'error' )
  }

  setSubmitstate(e) {
    this.setState({
      hasSubmitted: true
    }, () => {
      if (this.noErrors()) {
        this.props.setSuccessMsg("Success!");
        this.props.onClose();
      }
    })
  }

 renderForm = () => {
   const validation = this.setErrorState();
    return (
    <Form horizontal>
      <FormGroup validationState={validation.emailLevel}>
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl
            type="email"
            placeholder="Email"
            value={validation.email}
            onChange={this.handleEmailChange.bind(this)}
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
            onChange={this.handlePwChange.bind(this)}
          />
        <HelpBlock>{validation.passwordMessage}</HelpBlock>
        </Col>

      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button onClick={this.setSubmitstate.bind(this)} >
            Sign Up
          </Button>
        </Col>
      </FormGroup>
    </Form>
  )};

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderForm()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onClose} >Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SignUpModal;
