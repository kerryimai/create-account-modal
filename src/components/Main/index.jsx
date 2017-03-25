import React, { Component } from 'react';
import SignUpModal from '../SignUpModal';
import { Button } from 'react-bootstrap';


class Main extends Component {
  state = {
    SignUpModalOpen: false,
    successMeesage: ''
  };

  toggleSignUp = () => {
    this.setState({ SignUpModalOpen: !this.state.SignUpModalOpen })
  };

  handleSuccessLogin = (msg) => {
    this.setState({ successMeesage: msg})
  };

  render() {
    return (
      <div>
        <h1>Main</h1>
        <h4>{this.state.successMeesage}</h4>
        <SignUpModal open={this.state.SignUpModalOpen} onClose={this.toggleSignUp} setSuccessMsg={this.handleSuccessLogin}/>
        <Button onClick={this.toggleSignUp}> Sign up </Button>
      </div>
    );
  }
}

export default Main;
