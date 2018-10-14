import React from "react";
import {
  Button,
  Header,
  Image,
  Input,
  Modal,
  Menu,
  Icon
} from "semantic-ui-react";
import { upload, tambahAnggota } from "services";
import { Base_url } from "constant";

class TambahAnggotaPage extends React.Component {
  state = {
    userData: {},
    modalStatus: false,
    isEdit: true
  };
  onTextChange = (e, data) => {
    this.setState(state => {
      const userData = state.userData;
      userData[data.name] = data.value;
      state.userData = userData;
      return state;
    });
  };
  onUpload = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set("files", file, file.name);
    upload(formData).then(res => {
      const data = res.data[0];
      data.url = "/uploads/" + data.hash + data.ext;
      this.setState(state => {
        const userData = state.userData;
        userData.gambar = data;
        state.userData = userData;
        return state;
      });
    });
  };
  onSubmit = () => {
    tambahAnggota(this.state.userData).then(() => {
      this.props.history.push("/dashboard/anggota");
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
                  color="orange"
                  onClick={() => this.props.history.goBack()}
                />
              </Menu.Item>
              <Menu.Item
                name="Dashboard"
                onClick={() => this.props.history.push("/dashboard")}
              />
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
                  (this.state.newImage &&
                    `${Base_url}${this.state.newImage.url}`) ||
                  (this.state.userData.gambar &&
                    `${Base_url}${this.state.userData.gambar.url}`)
                }
                alt="anggota gambar"
              />
              <Input type="file" onChange={this.onUpload} />
            </div>
          )}

          {this.state.userData && (
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
                Detail
              </Header>

              <div
                style={{
                  margin: "20px auto",
                  display: "flex",
                  padding: "20px",
                  borderRadius: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.12)"
                }}
              >
                <Header as="h2" style={{ margin: "0px 20px 0px 0px" }}>
                  Nama
                </Header>
                <Input
                  size="big"
                  disabled={!this.state.isEdit}
                  name="nama"
                  value={this.state.userData.nama}
                  onChange={this.onTextChange}
                />
              </div>
              <div
                style={{
                  margin: "20px auto",
                  display: "flex",
                  padding: "20px",
                  borderRadius: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.12)"
                }}
              >
                <Header as="h2" style={{ margin: "0px 20px 0px 0px" }}>
                  Pangkat
                </Header>
                <Input
                  size="big"
                  disabled={!this.state.isEdit}
                  value={this.state.userData.pangkat}
                  onChange={this.onTextChange}
                  name="pangkat"
                />
              </div>
              <div
                style={{
                  margin: "20px auto",
                  display: "flex",
                  padding: "20px",
                  borderRadius: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.12)"
                }}
              >
                <Header as="h2" style={{ margin: "0px 20px 0px 0px" }}>
                  NRP
                </Header>
                <Input
                  size="big"
                  disabled={!this.state.isEdit}
                  name="nrp"
                  onChange={this.onTextChange}
                  value={this.state.userData.nrp}
                />
              </div>
              <div
                style={{
                  margin: "20px auto",
                  display: "flex",
                  padding: "20px",
                  borderRadius: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.12)"
                }}
              >
                <Header as="h2" style={{ margin: "0px 20px 0px 0px" }}>
                  No Hp
                </Header>
                <Input
                  size="big"
                  disabled={!this.state.isEdit}
                  onChange={this.onTextChange}
                  value={this.state.userData.nomor_telpon}
                  name="nomor_telpon"
                />
              </div>

              <Header>
                <Button color="orange" onClick={this.onSubmit}>
                  Submit
                </Button>
              </Header>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TambahAnggotaPage;
