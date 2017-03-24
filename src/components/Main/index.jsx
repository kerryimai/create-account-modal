import React, { Component } from 'react';
import SignUpModal from '../SignUpModal';
import { Button } from 'react-bootstrap';


class Main extends Component {
  state = {
    SignUpModalOpen: false,
  };

  toggleSignUp = () => {
    this.setState({ SignUpModalOpen: !this.state.SignUpModalOpen })
  };

  render() {
    return (
      <div>
        <h1>Main</h1>
        <SignUpModal open={this.state.SignUpModalOpen} onClose={this.toggleSignUp} />
        <Button onClick={this.toggleSignUp}> Sign up </Button>
      </div>
    );
  }
}

export default Main;
