import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Define our button, but with the use of props.theme this time

export const Button = styled.button`
  font-size: 18px;
  margin: 1em;
  padding: ${props => props.theme.padding};
  border-radius: 3px;
  text-transform: uppercase;
  border: none;
  display: inline-block;
  margin: 0 auto;
  min-width: 120px;
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  background: ${props => props.theme.bg};
  &:hover {
    background: $primaryColor;
      transition: 0.3s;
      cursor: pointer;
      -webkit-box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
  }
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: "white",
    bg: "#2176ff",
    padding: "15px 30px"
  }
}

// Define what props.theme will look like
const theme = {
  main: "#fb5e1c",
  bg: "white"
};


