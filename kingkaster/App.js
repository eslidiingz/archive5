/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './navigation/appNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import 'moment/locale/th';


import authReducer from './store/reducers/auth';
import bookingReducer from './store/reducers/booking';
import marketplaceReducer from './store/reducers/marketplace';


const theme = {
  colors: {
    primary: '#2A5DAA',
    secondary: '#D90000',
    grey0: '#333333'
  },
}

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  marketplace: marketplaceReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
