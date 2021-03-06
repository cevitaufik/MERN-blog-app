import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './component/home';
import Add from './component/add-articles';
import About from './component/about';
import Article from './component/article';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link to='/' class="navbar-brand fw-bold">
                My Blog
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to='/' class="nav-link active" aria-current="page">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/add' class="nav-link">
                      Add
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/about' className="nav-link">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/add' component={Add}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/update/:id' component={Article}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
