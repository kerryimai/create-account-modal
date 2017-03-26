import React, { Component } from 'react';
import SignUpModal from '../SignUpModal';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

class Main extends Component {

  state = {
    SignUpModalOpen: false,
  };

  toggleSignUp = () => {
    this.setState({ SignUpModalOpen: !this.state.SignUpModalOpen })
  };

  handleSignUpSuccess = () => {
    this.setState({signUpSuccess: true})
  };

  renderRedirect = () => {
    if (this.state.signUpSuccess) {
      return <Redirect push to="/dashboard" />
    }
  }


  render() {
    return (
      <div>
        {this.renderRedirect()}
        <h1>Main</h1>
        <SignUpModal
          open={this.state.SignUpModalOpen}
          onClose={this.toggleSignUp}
          onSignUpSuccess={this.handleSignUpSuccess}
        />
        <Button onClick={this.toggleSignUp}> Sign up </Button>
      </div>
    );
  }
}

export default Main;


// Main page start with background of wedding venue, sing up in the middle, opacity
