import React, { Component } from "react";
import { Provider } from "react-redux";
import Pages from "pages";
import store from "./store";
import {
  Switch,
  Route,
  BrowserRouter as Router,

  withRouter,
  //   Redirect,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Pages />
          </div>
        </Router>

      </Provider>
    );
  }
}

export default App;
