import React from "react";
import {
  Button,
  Rating,
  Header,
  Input,
  Table,
  Image,
  Modal,
  Grid,
  Segment,
  Menu,
  Icon
} from "semantic-ui-react";
import { GetDataAnggota, deleteAnggota } from "services";

class AnggotaPage extends React.Component {
  state = {
    curentPage: 0,
    searchKey: "",
    deleteModal: false
  };
  componentDidMount() {
    this.fetch();
  }

  onSearch = (a, data) => {
    this.setState({ searchKey: data.value }, () => {
      this.fetch(this.state.curentPage, this.state.searchKey);
    });
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

  fetch = (skip = 0, searchKey = "", sort = this.state.sort) => {
    GetDataAnggota(skip, searchKey, 7).then(res => {
      this.setState({
        anggotas: res.data
      });
    });
  };

  sort = clikedCol => () => {
    this.setState(
      {
        sort: `${clikedCol}:-1`
      },
      () => {
        this.fetch(this.state.skip, this.state.searchKey, this.state.sort);
      }
    );
  };
  openDeleteModal = id => {
    this.setState({
      deleteModal: true,
      idDeleteAnggota: id
    });
  };
  delete = () => {
    deleteAnggota(this.state.idDeleteAnggota).then(data => {
      const newAnggotas = this.state.anggotas.filter(
        anggota => anggota._id !== this.state.idDeleteAnggota
      );
      this.setState({
        anggotas: newAnggotas,
        deleteModal: false,
        idDeleteAnggota: null
      });
    });
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <h2 style={{ margin: "0" }}>Management Anggota</h2>
          <Input icon="search" onChange={this.onSearch} size="small" />
        </div>
        <div
          style={{
            paddingTop: "50px",
            maxWidth: "100%",
            overflow: "hidden"
          }}
        >
          <Modal open={this.state.deleteModal}>
            <Modal.Header>Konfirmasi Hapus</Modal.Header>
            <Modal.Content>
              Anda akan menghapus Data Anggota semua data mengenai anggota ini
              akan hilang termasuk data rating apakah anda ingin melanjutkan
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                onClick={() => this.setState({ deleteModal: false })}
              >
                batal
              </Button>
              <Button
                color="red"
                icon="trash"
                labelPosition="left"
                content="lanjutkan"
                onClick={this.delete}
              />
            </Modal.Actions>
          </Modal>
          <div
            style={{
              maxWidth: "100%",
              overflow: "auto"
            }}
          >
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    singleLine
                    name="nama"
                    onClick={this.sort("nama")}
                  >
                    Nama
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    onClick={this.sort("pangkat")}
                    name="pangkat"
                  >
                    Pangkat
                  </Table.HeaderCell>
                  <Table.HeaderCell name="nrp" onClick={this.sort("nrp")}>
                    NRP
                  </Table.HeaderCell>
                  <Table.HeaderCell name="nrp" onClick={this.sort("nrp")}>
                    Nomor Hp
                  </Table.HeaderCell>
                  <Table.HeaderCell name="nrp" onClick={this.sort("nrp")}>
                    action
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.anggotas &&
                  this.state.anggotas.map(anggota => (
                    <Table.Row key={anggota._id}>
                      <Table.Cell
                        onClick={() =>
                          this.props.history.push(`/anggota/${anggota._id}`)
                        }
                      >
                        {anggota.nama}
                      </Table.Cell>
                      <Table.Cell>{anggota.pangkat}</Table.Cell>
                      <Table.Cell>{anggota.nrp}</Table.Cell>
                      <Table.Cell>{anggota.nomor_telpon}</Table.Cell>
                      <Table.Cell>
                        <Button icon="pencil" color="orange" />
                        <Button
                          onClick={() => this.openDeleteModal(anggota._id)}
                          icon="trash"
                          color="red"
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                <Table.Row />
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="8">
                    <Button
                      color="green"
                      onClick={() => this.props.history.push("/anggota/new")}
                    >
                      Tambah anggota
                    </Button>
                    <Menu floated="right" pagination>
                      <Menu.Item as="a" icon onClick={this.prevPage}>
                        <Icon name="chevron left" />
                      </Menu.Item>
                      <Menu.Item as="a" icon onClick={this.nextPage}>
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default AnggotaPage;
