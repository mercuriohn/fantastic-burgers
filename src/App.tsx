import React from 'react';
import './App.css';
import Feed from './pages/Feed/Feed';
import Search from './pages/Search/Search';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Review from './pages/Reviews/Review';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/restaurant/:id" component={Review} />
          <Route path="/search/:zipcode" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
