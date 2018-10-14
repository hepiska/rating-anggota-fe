import React from "react";
import {
  Button,
  Rating,
  Header,
  Image,
  Modal,
  Grid,
  Segment,
  Menu,
  Icon
} from "semantic-ui-react";
import {
  Switch,
  Route
  //   Redirect,
} from "react-router-dom";
import { postRating } from "services";
import { Base_url } from "constant";

import RatingAnggotaPage from "./ratingAnggota";
import AngotaPage from "./anggota";

class Dashboard extends React.Component {
  state = {
    rating: {},
    modalStatus: false
  };
  componentDidMount() {}

  render() {
    return (
      <div
        className="login-form"
        style={{
          backgroundColor: "white",
          position: "relative",
          width: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "20px",
            justifyContent: "center",
            position: "fixed",
            width: "100vw",
            background: "#fff",
            zIndex: 10,
            boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.12)"
          }}
        >
          <div style={{ width: "100%", padding: "0px 20px" }}>
            <Header as="h4" color="orange" textAlign="left">
              <Image
                src="/poldaBali.png"
                style={{ margin: "0px 20px 0px 0px" }}
              />
              Regident Denpasar
            </Header>
          </div>
        </div>

        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            padding: "100px 5% 20px",
            display: "flex",
            flexDirection: "row",
            zIndex: 1,
            flexWrap: "wrap"
          }}
        >
          <Grid style={{ width: "100%" }}>
            <Grid.Column width={4}>
              <Menu secondary vertical size="small">
                <Menu.Item
                  name="Peringkat Anggota"
                  active={this.props.history.location.pathname === "/dashboard"}
                  onClick={() => this.props.history.push("/dashboard")}
                />
                <Menu.Item
                  name="Management Anggota"
                  active={
                    this.props.history.location.pathname ===
                    "/dashboard/anggota"
                  }
                  onClick={() => this.props.history.push("/dashboard/anggota")}
                />
                <Menu.Item
                  name="Management User"
                  active={
                    this.props.history.location.pathname === "/dashboard/user"
                  }
                  onClick={() => this.props.history.push("/dashboard/user")}
                />
                <Menu.Item
                  name="Halaman Depan"
                  onClick={() => this.props.history.push("/")}
                />
                <Menu.Item name="Keluar" />
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              <Switch>
                <Route exact path="/dashboard" component={RatingAnggotaPage} />
                <Route path="/dashboard/anggota" component={AngotaPage} />
              </Switch>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Dashboard;
