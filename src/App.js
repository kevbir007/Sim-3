import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import router from "./router";
import Home from './Components/Home/home';
import { connect } from 'react-redux';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        {router}
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    state
  };
}

export default connect( mapStateToProps )( App );
