import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

const apiKey = process.env.REACT_APP_GOOGLEMAP_API_KEY;
const script = document.createElement('script');

script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
script.async = true;
script.defer = true;
document.head.appendChild(script);

ReactDOM.render(<App />, document.getElementById('root'));
