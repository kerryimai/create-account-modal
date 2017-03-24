import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/Main';
import Dashboard from './components/Dashboard';


import './App.scss';

const App = () => (
  <BrowserRouter>
    <div>
        <Route exact path="/" component={Main} />
        <Route exact path="/dashboard" component={Dashboard} />

    </div>
  </BrowserRouter>
);


export default App;
