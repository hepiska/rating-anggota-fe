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
import {
  getAnggotaDetail,
  getRatingParameter,
  getAverageRating
} from "services";

class RatingAnggotaPage extends React.Component {
  state = {
    curentPage: 0,
    searchKey: ""
  };
  componentDidMount() {
    getRatingParameter().then(res => {
      this.setState({
        ratingParams: res.data
      });
    });
    this.fetchRating();
  }

  onSearch = (a, data) => {
    this.setState({ searchKey: data.value }, () => {
      this.fetchRating(this.state.curentPage, this.state.searchKey);
    });
  };

  nextPage = () => {
    const page = this.state.curentPage + 1;
    this.fetchRating(page, this.state.searchKey);
    this.setState({
      curentPage: page
    });
  };

  prevPage = () => {
    const page =
      this.state.curentPage > 0
        ? this.state.curentPage - 1
        : this.state.curentPage;
    this.fetchRating(page, this.state.searchKey);
    this.setState({
      curentPage: page
    });
  };

  fetchRating = (skip = 0, searchKey = "", sort = this.state.sort) => {
    getAverageRating(skip, searchKey, sort).then(res => {
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
        this.fetchRating(
          this.state.skip,
          this.state.searchKey,
          this.state.sort
        );
      }
    );
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
          <h2 style={{ margin: "0" }}>Rating Anggota</h2>
          <Input icon="search" onChange={this.onSearch} size="small" />
        </div>
        <div
          style={{
            paddingTop: "50px",
            maxWidth: "100%",
            overflow: "hidden"
          }}
        >
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
                  {this.state.ratingParams &&
                    this.state.ratingParams.map(param => (
                      <Table.HeaderCell
                        name={param}
                        key={param}
                        onClick={this.sort(param)}
                      >
                        {param}
                      </Table.HeaderCell>
                    ))}
                  <Table.HeaderCell
                    name="average"
                    onClick={this.sort("average")}
                  >
                    Rerata
                  </Table.HeaderCell>
                  <Table.HeaderCell name="count" onClick={this.sort("count")}>
                    Total Rating
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.anggotas &&
                  this.state.anggotas.map(anggota => (
                    <Table.Row key={anggota._id}>
                      <Table.Cell>{anggota.nama}</Table.Cell>
                      <Table.Cell>{anggota.pangkat}</Table.Cell>
                      <Table.Cell>{anggota.nrp}</Table.Cell>
                      <Table.Cell>
                        <Rating
                          icon="star"
                          size="mini"
                          disabeled="true"
                          rating={Math.round(anggota.keramahan)}
                          maxRating={6}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Rating
                          icon="star"
                          size="mini"
                          disabeled="true"
                          rating={Math.round(anggota.performa)}
                          maxRating={6}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Rating
                          icon="star"
                          size="mini"
                          disabeled="true"
                          rating={Math.round(anggota.umum)}
                          maxRating={6}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Rating
                          icon="star"
                          size="mini"
                          disabeled="true"
                          rating={Math.round(anggota.average)}
                          maxRating={6}
                        />
                      </Table.Cell>
                      <Table.Cell>{anggota.count}</Table.Cell>
                    </Table.Row>
                  ))}
                <Table.Row />
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="8">
                    <Menu floated="left" pagination>
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

export default RatingAnggotaPage;
