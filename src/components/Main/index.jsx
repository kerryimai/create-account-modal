import React, { Component } from 'react';
import SignUpModal from '../SignUpModal';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import venueSrc from './venue.jpg';

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

  styles = {
    outer: {
      backgroundImage: `url(${venueSrc})`,
      height: '100vh',
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 240,
      height: 160,
      fontSize: 40,
      border: '6px double #8c888c',

    }
  };

  render() {
    return (
      <div style={this.styles.outer}>
        {this.renderRedirect()}
        <SignUpModal
          open={this.state.SignUpModalOpen}
          onClose={this.toggleSignUp}
          onSignUpSuccess={this.handleSignUpSuccess}
        />
      <Button className="cursive" style={this.styles.button} onClick={this.toggleSignUp}> Sign up </Button>
      </div>
    );
  }
}

export default Main;


// Main page start with background of wedding venue, sing up in the middle, opacity
