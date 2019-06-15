import React from 'react';
import { UPDATE_TOTAL_DONATE,UPDATE_ITEM_DONATE, UPDATE_MESSAGE} from './constants/actionTypes';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';


const store = createStore(function(state, action) {
  const _state = state == null ? {
    donate: 0,
    donateGroupCharitiesId: [],
    message: '',
  } : state;
  switch (action.type) {
    case UPDATE_TOTAL_DONATE:
      return Object.assign({}, _state, {
        donate: _state.donate + action.amount,
      });
    case UPDATE_MESSAGE:
      return Object.assign({}, _state, {
        message: action.message,
      });

    default: return _state;
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

