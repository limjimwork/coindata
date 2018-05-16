import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/header'
import CoinoneData from './components/coinoneData'
import BithumbData from './components/bithumbData'
import Footer from './components/footer'
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={CoinoneData}/>
          <Route path="/coinone" component={CoinoneData}/>
          <Route path="/bithumb" component={BithumbData}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
