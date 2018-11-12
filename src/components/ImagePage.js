import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import C from './config';
import { convertTime } from '../utils';

export default class ImagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagedata: null,
      baseimagedata: null,
    };
    this.imageurl = `${C.DISPATCHHOST}:${C.DISPATCHPORT}/v1/image`;
    this.baseimageurl = `${C.DISPATCHHOST}:${C.DISPATCHPORT}/v1/baseimage`;
  }

  componentDidMount() {
    fetch(this.imageurl)
      .then(response => response.json())
      .then(imagedata => this.setState({ imagedata }));

    fetch(this.baseimageurl)
      .then(response => response.json())
      .then(baseimagedata => this.setState({ baseimagedata }));
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
    if (this.state.imagedata != null) {
      this.state.imagedata.forEach((element) => {
        if (!isNaN(element.createdTime)) {
          element.createdTime = convertTime(element.createdTime);
        }
      });
    }

    if (this.state.baseimagedata != null) {
      this.state.baseimagedata.forEach((element) => {
        if (!isNaN(element.createdTime)) {
          element.createdTime = convertTime(element.createdTime);
        }
      });
    }

    return (
      <div>
        <Row>
          <Col sm={1} />
          <Col sm={10}>
            <div>
              <h3 style={{ textAlign: 'center' }}>Images</h3>
              <p>Click row for details</p>
            </div>
            <BootstrapTable
              data={this.state.imagedata}
              pagination
              hover
              expandableRow={this.isExpandableRow}
              expandComponent={this.expandComponent}
              search
            >
              <TableHeaderColumn dataField="name" isKey dataSort width="200">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="dockerUrl">URL</TableHeaderColumn>
              <TableHeaderColumn dataField="status" dataSort width="150">Status</TableHeaderColumn>
              <TableHeaderColumn dataField="createdTime" dataSort width="200">Created Time</TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
        <Row>
          <Col sm={1} />
          <Col sm={10}>
            <div>
              <h3 style={{ textAlign: 'center' }}>BaseImages</h3>
              <p>Click row for details</p>
            </div>
            <BootstrapTable
              data={this.state.baseimagedata}
              pagination
              hover
              expandableRow={this.isExpandableRow}
              expandComponent={this.expandComponent}
              search
            >
              <TableHeaderColumn dataField="name" isKey dataSort width="200">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="dockerUrl">URL</TableHeaderColumn>
              <TableHeaderColumn dataField="status" dataSort width="150">Status</TableHeaderColumn>
              <TableHeaderColumn dataField="createdTime" dataSort width="200">Created Time</TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>

      </div>
    );
  }
}
