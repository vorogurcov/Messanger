import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactModal from 'react-modal';
import { Provider } from 'react-redux';
import { store } from './featuries/entities/store/store';
import { UserSliceManager } from './featuries/entities/store/featuries/userSlice';

async function start() {
  ReactModal.setAppElement('#root');
  store.dispatch(UserSliceManager.fetching.getData())

  const root = ReactDOM.createRoot(document.getElementById('root')!)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

start()

