import React, { Component } from 'react';
import {
  FormControl, FormGroup, ControlLabel, HelpBlock, Button,
} from 'react-bootstrap';
import C from './config';

export default class RunFucntion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '{}',
      result: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.url = `${C.DISPATCHHOST}:${C.DISPATCHPORT}/v1/runs?functionName=${this.props.functionName}`;
  }

  getValidationState() {
    const str = this.state.value;
    try {
      JSON.parse(str);
    } catch (e) {
      return 'error';
    }
    return 'success';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleClick() {
    const payload = {
      blocking: true,
      input: JSON.parse(this.state.value),
      reason: null,
      secrets: [],
      services: null,
      tags: null,
    };
    fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(result => this.setState({ result }));
  }

  render() {
    const example = {
      name: 'Jon',
      place: 'Winterfell',
    };
    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Input parameters:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>
Json format required, for example
              { JSON.stringify(example) }
            </HelpBlock>
          </FormGroup>
          <Button bsStyle="primary" onClick={this.handleClick} disabled={this.getValidationState() !== 'success'}>Run</Button>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Output:</ControlLabel>
            <pre>{ JSON.stringify(this.state.result.output) }</pre>
            <ControlLabel>Detail:</ControlLabel>
            <pre>
              { JSON.stringify(this.state.result, null, 2) }
            </pre>
          </FormGroup>
        </form>
      </div>
    );
  }
}
