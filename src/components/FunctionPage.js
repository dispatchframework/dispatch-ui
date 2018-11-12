import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import C from './config';
import { convertTime } from '../utils';
import RunFucntion from './RunFunction';

export default class ImagePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: null,
      value: '',
      result: null,
    };
    this.url = `${C.DISPATCHHOST}:${C.DISPATCHPORT}/v1/function`;
    this.runurl = `${C.DISPATCHHOST}:${C.DISPATCHPORT}/v1/runs?functionName=`;
  }

  componentDidMount() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  expandComponent(row) {
    return (
      <div>
        <pre>{JSON.stringify(row, null, 2)}</pre>
        <RunFucntion functionName={row.name} />
      </div>
    );
  }

  isExpandableRow() {
    return true;
  }

  render() {
    if (this.state.data != null) {
      this.state.data.forEach((element) => {
        element.createdTime = convertTime(element.createdTime);
      });
    }

    return (
      <div>
        <Row>
          <Col sm={1} />
          <Col sm={10}>
            <div>
              <h3 style={{ textAlign: 'center' }}>Functions</h3>
              <p>Click row for details and run function</p>
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
              <TableHeaderColumn dataField="functionImageURL">Function Image</TableHeaderColumn>
              <TableHeaderColumn dataField="status" dataSort width="150">Status</TableHeaderColumn>
              <TableHeaderColumn dataField="createdTime" dataSort width="200">Created Time</TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </div>
    );
  }
}
