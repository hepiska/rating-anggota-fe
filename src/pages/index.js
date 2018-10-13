import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router
  //   Redirect,
} from "react-router-dom";

import LoginPage from "./login";
import RatingPage from "./rating";

const Pages = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={RatingPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default Pages;
