import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './components/App/App';
import store from './duck/store';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  app
);

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(
        process.env.NODE_ENV === 'development'
          ? '/sw.js'
          : 'https://drillprop.github.io/pomodoro/sw.js'
      )
      .catch((err) => console.error(err));
  });
}
