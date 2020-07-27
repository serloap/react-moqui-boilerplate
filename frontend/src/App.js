import React from 'react';
import axios from 'axios';
import './styles/app.scss';
import './test.css';

const testProxy = () => axios.get('/rest/moquiSessionToken')
  .then((result) => console.log(result)); // eslint-disable-line no-console

export default function App() {
  testProxy();

  return (
    <div className="main-container">
      <div className="test d-flex text-center">
        ok
      </div>
    </div>
  );
}
