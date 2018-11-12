import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import C from './config';

export default class EventDriverPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.url = `${C.DISPATCHHOST}:${C.DISPATCHPORT}/v1/event/drivers`;
  }

  componentDidMount() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  expandComponent(row) {
    return (
      <pre>{JSON.stringify(row, null, 2)}</pre>
    );
  }

  isExpandableRow() {
    return true;
  }

  render() {
    console.log(this.state.data);
    if (this.state.data !== null) {
      this.state.data.map(function (row) {
        row["config"] = row["config"].map(function (item) {
          return item["key"] + " = " + item["value"];
        });
        return null;
      });
    }
    return (
      <Row>
        <div>
          <Col sm={1} />
          <Col sm={10}>
            <div>
              <h3 style={{ textAlign: 'center' }}>EventDrivers</h3>
              <p>Click row for details</p>
            </div>
            <BootstrapTable
              data={this.state.data}
              pagination
              hover
              expandableRow={this.isExpandableRow}
              expandComponent={this.expandComponent}
              search
            >
              <TableHeaderColumn dataField="name" isKey dataSort width="200">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="type" dataSort width="200">Type</TableHeaderColumn>
              <TableHeaderColumn dataField="status" dataSort width="100">status</TableHeaderColumn>
              <TableHeaderColumn dataField="secrets" dataSort width="100">Secret</TableHeaderColumn>
              <TableHeaderColumn dataField="config" dataSort width="100">Config</TableHeaderColumn>
              <TableHeaderColumn dataField="url" dataSort>URL</TableHeaderColumn>
              <TableHeaderColumn dataField="reason" dataSort width="100">Reason</TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </div>
      </Row>
    );
  }
}
