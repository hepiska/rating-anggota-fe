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
import Dashboard from "./dashboard";
import DetailAnggotaPage from "./detailAnggota";
import TambahAnggotaPage from "./tambahAnggota";

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
          <Route path="/dashboard/" component={Dashboard} />
          <Route path="/anggota/new" component={TambahAnggotaPage} />
          <Route path="/anggota/:id" component={DetailAnggotaPage} />
          <Route path="/" component={AnggotaPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default Pages;
