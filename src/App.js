import React from 'react';
import './App.css';
import ZipCodeForm from './components/ZipCodeForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './redux/reducer';

const store = configureStore({
  reducer: reducer,
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              Zip Code App
            </a>
          </div>
        </nav>
        <main>
          <ZipCodeForm />
        </main>
      </div>
    </Provider>
  );
}

export default App;
