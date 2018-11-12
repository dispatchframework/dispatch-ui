import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import C from './config';

export default class APIPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.url = `${C.DISPATCHHOST}:${C.DISPATCHPORT}/v1/api`;
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
    return (
      <div>
        <Row>
          <Col sm={1} />
          <Col sm={10}>
            <div>
              <h3 style={{ textAlign: 'center' }}>APIs</h3>
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
              <TableHeaderColumn dataField="function" dataSort width="200">Function</TableHeaderColumn>
              <TableHeaderColumn dataField="protocols" dataSort width="100">Protocol</TableHeaderColumn>
              <TableHeaderColumn dataField="domain" dataSort width="100">Domain</TableHeaderColumn>
              <TableHeaderColumn dataField="uris" dataSort>Path</TableHeaderColumn>
              <TableHeaderColumn dataField="auth" dataSort width="100">Auth</TableHeaderColumn>
              <TableHeaderColumn dataField="status" dataSort width="100">status</TableHeaderColumn>
              <TableHeaderColumn dataField="enabled" dataSort width="100">Enable</TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </div>
    );
  }
}
