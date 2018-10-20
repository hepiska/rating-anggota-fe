import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Modal,
  Segment
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "services";
import { LOGIN } from "modules/auth";

class LoginPage extends React.Component {
  state = {
    identifier: "",
    password: "",
    errorModaOpen: false,
    errorMessange: "",
    isAuth: false,
  };

  componentDidMount() {
    if (this.state.isAuth) {
      this.props.history.push('/')
    }

  }

  _onChange = (e, data) => {
    this.setState(state => {
      state[data.name] = data.value;
      return state;
    });
  };

  onClick = () => {
    login(this.state)
      .then(({ data }) => {
        this.props.LOGIN({
          token: data.jwt,
          username: data.user.username,
          isAuth: true
        });
        window.location.replace('/')
      })
      .catch(err => {
        this.setState({
          errorModaOpen: true,
          errorMessange: err.response.data.message
        });
      });
  };

  closeModal = () => {
    this.setState({
      errorModaOpen: false,
      errorMessange: ""
    });
  };

  render() {
    return (
      <div
        className="login-form"
        style={{
          backgroundColor: "white"
        }}
      >
        <Modal
          size="small"
          open={this.state.errorModaOpen}
          onClose={this.close}
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>{JSON.stringify(this.state.errorMessange)}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModal} color="blue">
              tutup
            </Button>
          </Modal.Actions>
        </Modal>
        <div style={{ width: "100%", padding: "80px" }}>
          <Header as="h2" color="orange" textAlign="center">
            <Image src="/poldaBali.png" style={{ margin: "0px 40px 0px" }} />
            Regident Denpasar
          </Header>
        </div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="orange" textAlign="center">
              Login
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  name="identifier"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this._onChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  onChange={this._onChange}
                  name="password"
                  placeholder="Password"
                  type="password"
                />

                <Button
                  onClick={this.onClick}
                  color="orange"
                  fluid
                  size="large"
                >
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
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
      LOGIN
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
