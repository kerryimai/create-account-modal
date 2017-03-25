import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';


const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

class SignUpModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    isSubmit: false,
    passwordLevel: null,
    passwordMessage: '',
    emailLevel: null,
    emailMessage: '',
  };

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    }, this.setErrorState);

  };

  handlePwChange(e) {
    this.setState({
      password: e.target.value,
    }, this.setErrorState);
  };

  setErrorState() {
    const emailIsValid = emailRe.test(this.state.email);
    const emailLevel = emailIsValid ? 'success' : 'error';
    const emailMessage = emailIsValid ? '' : 'Email is invalid';

    let passwordLevel;
    let passwordMessage = '';
    const length = this.state.password.length;
    if (length > 10) {
      passwordLevel = 'success';
    } else if (length > 6) {
      passwordLevel = 'warning';
      passwordMessage = 'Longer passwords are more secure';
    } else if (length > 0) {
      passwordLevel = 'error';
      passwordMessage = 'Password is too short';
    }

    this.setState({
      passwordLevel,
      passwordMessage,
      emailLevel,
      emailMessage,
    });
  };



  setSubmitstate(e) {
    this.setState({
      isSubmit: true
    })
  }

 renderForm = () => (
    <Form horizontal>
      <FormGroup validationState={this.state.emailLevel}>
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
          />
        <HelpBlock>{this.state.emailMessage}</HelpBlock>
        </Col>
      </FormGroup>

      <FormGroup validationState={this.state.passwordLevel}>
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePwChange.bind(this)}
          />
        <HelpBlock>{this.state.passwordMessage}</HelpBlock>
        </Col>

      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button onClick={this.setSubmitstate.bind(this)}>
            Sign In
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderForm()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SignUpModal;
