import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DonateArticles from './components/Home/DonateListItem';

const imgPath = "images/";

export default connect((state) => state)(
  class App extends Component {
    render() {
      return (
        <div className="container">
          <header>
            <a href="#" title="omise" className="logo"><img src={imgPath + "logo/omise-wordmark.png"} alt="omise" /></a>
          </header>
          <div className="main-container">
            <DonateArticles />
          </div>
        </div>
      );
    }
  }
);
