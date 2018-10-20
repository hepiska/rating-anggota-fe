import React from "react";
import {
  Button,
  Rating,
  Header,
  Image,
  Modal,
  Menu,
  Icon
} from "semantic-ui-react";
import { getAnggotaDetail, getRatingParameter, postRating } from "services";
import { Base_url } from "constant";

class RatingPage extends React.Component {
  state = {
    rating: {},
    modalStatus: false
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      getAnggotaDetail(this.props.match.params.id).then(res => {
        this.setState({
          userData: res.data
        });
      });
    } else {
      this.props.history.push("/");
    }
    getRatingParameter().then(res => {
      const rating = this.state.rating;
      res.data.forEach(ras => {
        rating[ras] = 0;
      });
      this.setState({
        ratingParams: res.data,
        rating: rating
      });
    });
  }

  addRating = (e, data) => {
    this.setState(state => {
      state.rating[data.name] = data.rating;
      return state;
    });
  };
  submitRating1 = () => {
    if (Object.keys(this.state.rating).length > 0) {
      this.setState({
        modalStatus: true
      });
    } else {
      alert("Harap Masukan Rating");
    }
  };

  submitRating2 = () => {
    const anggota = this.state.userData.id;
    const ratingdata = { anggota, ...this.state.rating };
    postRating(ratingdata)
      .then(() => {
        this.setState({
          modalStatus: true
        });
        this.props.history.push("/");
      })
      .catch(err => {
        alert(err.response.message);
      });
  };
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
        <Modal open={this.state.modalStatus}>
          <Modal.Header>
            Apakah yakin untuk memberikan rating seperti berikut
          </Modal.Header>
          <Modal.Content image>
            {this.state.rating &&
              Object.keys(this.state.rating).map(key => {
                return (
                  <div
                    key={key}
                    style={{
                      padding: "20px 20px",
                      display: "flex",
                      flexDirection: "column"
                      // flexWrap: "wrap"
                    }}
                  >
                    <Header
                      as="h2"
                      color="orange"
                      textAlign="center"
                      style={{ textTransform: "capitalize" }}
                    >
                      {key}
                    </Header>
                    <Rating
                      maxRating={6}
                      defaultRating={this.state.rating[key]}
                      disabled
                      onRate={this.addRating}
                      name={key}
                      icon="star"
                      size="massive"
                    />
                  </div>
                );
              })}
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="orange"
              icon
              labelPosition="left"
              onClick={() => this.setState({ modalStatus: false })}
            >
              <Icon name="pencil" />
              Edit
            </Button>
            <Button
              color="blue"
              icon
              onClick={this.submitRating2}
              labelPosition="left"
            >
              <Icon name="send" />
              Submit
            </Button>
          </Modal.Actions>
        </Modal>
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
          <Menu secondary style={{ margin: "0" }}>
            <Menu.Menu position="right">
              <Menu.Item>
                <Icon
                  name="arrow alternate circle left"
                  size="big"
                  onClick={() => this.props.history.goBack()}
                  color="orange"
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%",
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
        <div
          style={{
            width: "100vw",
            position: "relative",
            padding: "90px 5% 20px",
            display: "flex",
            flexDirection: "row",
            zIndex: 1,
            flexWrap: "wrap"
          }}
        >
          {this.state.userData && (
            <div
              style={{
                width: "340px",
                margin: "20px auto",
                padding: "20px",
                display: "flex",
                borderRadius: "8px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.12)"
              }}
            >
              <img
                style={{
                  width: "300px",
                  height: "350px",
                  borderRadius: "8px",
                  boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.12)"
                }}
                src={
                  this.state.userData.gambar &&
                  `${Base_url}${this.state.userData.gambar.url}`
                }
                alt="anggota gambar"
              />
              <div style={{ width: "100%", margin: "20px 0px" }}>
                <Header
                  as="h1"
                  fluid
                  color="orange"
                  style={{ textTransform: "capitalize" }}
                >
                  Nama: {this.state.userData.nama}
                </Header>
              </div>
              <div style={{ width: "100%", margin: "0px 0px" }}>
                <Header
                  as="h2"
                  fluid
                  color="orange"
                  style={{ textTransform: "capitalize" }}
                >
                  Pangkat: {this.state.userData.pangkat}
                </Header>
              </div>
            </div>
          )}

          <div style={{ width: "400px", margin: "20px auto" }}>
            <Header
              as="h2"
              fluid="true"
              textAlign="center"
              color="orange"
              dividing
              style={{
                textTransform: "capitalize",

                margin: "20px 0px"
              }}
            >
              Berikan Rating
            </Header>
            {this.state.ratingParams &&
              this.state.ratingParams.map(param => {
                return (
                  <div
                    key={param}
                    style={{
                      padding: "20px 20px",
                      display: "flex",
                      flexDirection: "column"
                      // flexWrap: "wrap"
                    }}
                  >
                    <Header
                      as="h2"
                      color="orange"
                      textAlign="center"
                      style={{ textTransform: "capitalize" }}
                    >
                      {param}
                    </Header>
                    <Rating
                      maxRating={6}
                      defaultRating={0}
                      onRate={this.addRating}
                      name={param}
                      icon="star"
                      size="massive"
                    />
                  </div>
                );
              })}
            <Header as="h2" textAlign="center">
              <Button
                size="huge"
                fluid
                color="orange"
                onClick={this.submitRating1}
              >
                Submit
              </Button>
            </Header>
          </div>
        </div>
      </div>
    );
  }
}

export default RatingPage;
