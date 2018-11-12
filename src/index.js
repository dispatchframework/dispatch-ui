import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import App from './components/App';
import registerServiceWorker from './components/registerServiceWorker';
import ImagePage from './components/ImagePage';
import APIPage from './components/APIPage';
import FunctionPage from './components/FunctionPage';
import EventDriverPage from './components/EventDriverPage';

render(
  <Router>
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Dispatch</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="images">
            Images
          </NavItem>
          <NavItem eventKey={2} href="functions">
            Functions
          </NavItem>
          <NavItem eventKey={3} href="apis">
            APIs
          </NavItem>
          <NavItem eventKey={4} href="eventdrivers">
            EventDrivers
          </NavItem>
        </Nav>
      </Navbar>

      <Route exact path="/" component={App} />
      <Route path="/images" component={ImagePage} />
      <Route path="/functions" component={FunctionPage} />
      <Route path="/apis" component={APIPage} />
      <Route path="/eventdrivers" component={EventDriverPage} />
    </div>
  </Router>,

  document.getElementById('root'),
);

registerServiceWorker();
