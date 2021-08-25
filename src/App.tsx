import React from 'react';
import logo from './logo.svg';
import './App.css';
import Restaurants from "./pages/Restaurants/Restaurants";
import Feed from './pages/Feed/Feed';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Link to="/restaurants" >Restaurants page </Link>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/restaurants" component={Restaurants} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
