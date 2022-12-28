import React from 'react';

import './App.css';
import { Provider } from 'react-redux';
import MainPage from './Components/MainPage';
//import { store } from './Redux/store/ConfigureStore';
import { persistor, store } from './Redux/store/ConfigureStore';
import { PersistGate } from 'redux-persist/integration/react';


function App():JSX.Element {

  return( 
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainPage />
    </PersistGate>
  </Provider>
  )
}

export default App;
