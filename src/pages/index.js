import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router
  //   Redirect,
} from "react-router-dom";

import LoginPage from "./login";
import AnggotaPage from "./anggota";
import RatingPage from "./rating";

const Pages = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          // height:'100vw'
          opacity: 0.1,
          top: "0",
          left: "0",
          zIndex: 0,
          height: "100%",
          backgroundImage: "url('/logoLantas.png')",
          backgroundPosition: "center",
          backgroundSize: "460px 440px",
          backgroundRepeat: "no-repeat"
        }}
      />
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/rating/:id" component={RatingPage} />
          <Route path="/" component={AnggotaPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default Pages;
