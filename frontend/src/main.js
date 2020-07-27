import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import Modal from 'react-modal';
// import store, { history } from './redux';
import App from './App';

Modal.setAppElement('#root');

const render = () => {
  ReactDOM.render(
    // <Provider store={store}>
    //  {/* <ConnectedRouter history={history}> */}
    <App />,
    //  {/* </ConnectedRouter> */}
    // </Provider>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}

render();
