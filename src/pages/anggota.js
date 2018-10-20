import React from "react";
import {
  Button,
  Input,
  Menu,
  Header,
  Image,
  Card,
  Loader
} from "semantic-ui-react";
import { GetDataAnggota } from "services";
import { Base_url } from "constant";
import { connect } from 'react-redux'

const UserCard = ({ nama, pangkat, gambar }) => {
  return (
    <Card>
      <img style={{ width: "250px", height: "280px" }} src={gambar} />
      <Card.Content>
        <Card.Header style={{ textTransform: "capitalize" }}>
          {nama}
        </Card.Header>
        <Card.Meta>
          <span className="date" style={{ textTransform: "capitalize" }}>
            {pangkat}
          </span>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

const EmpryState = () => (
  <div
    style={{
      display: "flex",
      width: "100%",
      height: "400px",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Header>Belum Ada Data untuk di tampilkan</Header>
  </div>
);

class AggotaPage extends React.Component {
  state = {
    curentPage: 0,
    searchKey: ""
  };

  componentDidMount() {
    if (
      !this.props.isAuth
    ) {
      this.props.history.push('/login')
    }
    this.fetch();
  }

  onSearch = (e, data) => {
    this.setState({
      searchKey: data.value
    });
    this.fetch(this.state.curentPage, data.value);
  };

  nextPage = () => {
    const page = this.state.curentPage + 1;
    this.fetch(page, this.state.searchKey);
    this.setState({
      curentPage: page
    });
  };

  prevPage = () => {
    const page =
      this.state.curentPage > 0
        ? this.state.curentPage - 1
        : this.state.curentPage;
    this.fetch(page, this.state.searchKey);
    this.setState({
      curentPage: page
    });
  };

  fetch = (skip = 0, searchkey = "") => {
    GetDataAnggota(skip, searchkey).then(res => {
      this.setState({
        anggotas: res.data
      });
    });
  };
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
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
            <Menu.Item name="Dashboard" onClick={() => this.props.history.push('/dashboard')} />
            <Menu.Menu position="right">
              <Menu.Item>
                <Input
                  icon="search"
                  onChange={this.onSearch}
                  placeholder="Search..."
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
        <div
          style={{
            width: "100vw",
            padding: "90px 5% 20px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {this.state.anggotas ? (
            this.state.anggotas.length === 0 ? (
              <EmpryState />
            ) : (
                this.state.anggotas.map(anggota => (
                  <div
                    onClick={() =>
                      this.props.history.push(`/rating/${anggota.id}`)
                    }
                    style={{ margin: "25px auto", width: "250px" }}
                  >
                    <UserCard
                      fluid
                      nama={anggota.nama}
                      pangkat={anggota.pangkat}
                      gambar={`${Base_url}${anggota.gambar &&
                        anggota.gambar.url}`}
                    />
                  </div>
                ))
              )
          ) : (
              <Loader size="huge">Loading</Loader>
            )}
        </div>
        <div
          style={{
            width: "100vw",
            padding: "0px 5vw 40px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Button onClick={this.prevPage}>Sebelumnya</Button>
          <Button onClick={this.nextPage}>Berikutnya</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, null)(AggotaPage);
