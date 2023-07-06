import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router/Router';
import Route from './router/Route';
import Root from './Page/Root';
import About from './Page/About';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Route path='/' component={<Root />} />
    <Route path='/about' component={<About />} />
  </Router>
);
