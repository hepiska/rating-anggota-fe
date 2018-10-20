import React from "react";
import {
  Header,
  Image,
  Grid,
  Menu,
} from "semantic-ui-react";
import {
  Switch,
  Route
  //   Redirect,
} from "react-router-dom";
import { bindActionCreators } from "redux";
import { postRating } from "services";
import { Base_url } from "constant";
import { connect } from 'react-redux'
import { LOGOUT } from 'modules/auth'

import RatingAnggotaPage from "./ratingAnggota";
import AngotaPage from "./anggota";

class Dashboard extends React.Component {
  state = {
    rating: {},
    modalStatus: false,
    isAuth: this.props.isAuth
  };


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuth !== prevState.isAuth) {

      return {
        isAuth: nextProps.isAuth
      }
    }
    return null
  }

  componentDidMount() {
    console.log(this.state.isAuth);

    if (!this.state.isAuth) {
      this.props.history.push('/login')
    }
  }

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
                  name="Halaman Depan"
                  onClick={() => this.props.history.push("/")}
                />
                <Menu.Item name="Keluar" onClick={() => {
                  this.props.LOGOUT()
                  window.location.replace('/login')
                }} />
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

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      LOGOUT
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
