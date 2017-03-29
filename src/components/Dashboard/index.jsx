import React, { Component } from 'react';
import tableSrc from './white-table.jpg';

class Dashboard extends Component {
  styles = {
    outer: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'cursive',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
    },
    header: {
      flexGrow: '1',
      backgroundSize: 'cover',
      backgroundImage: `url(${tableSrc})`,
      backgroundPosition: 'center center',
      minHeight: '45%',
      width: '100%',
    },
    footer: {
      flexGrow: '2',
      background: 'slategray',
      alignContent: 'flex-end',
      width: '100%',
      fontSize: 25,
      padding: 20,
      color: 'white',
    },
    intro: {
      fontFamily: 'cursive',
      flexGrow: '2',
      textAlign: 'center',
      padding: 25,
      background: '#eeeeee',
      fontSize: 20,
    }
  };

  render() {
    return (
      <div className="dashboard-container" style={this.styles.outer}>
        <div style={this.styles.header} />
        <div style={this.styles.intro}>
          <h1 >Personal Dashboard</h1>
          <p className="successMsg">
             Congradulations, your account has succesfully been created!
             This is your very own wedding Journal, it will guide you through every detail you need for planning your dream wedding.
          </p>
         </div>
         <div style={this.styles.footer}>
           Step 1:   ...
         </div>
       </div>
    );
  }
}

export default Dashboard;
