import React, {Component} from 'react'
import {DatesRangeInput} from 'semantic-ui-calendar-react';
import {Form} from "semantic-ui-react";

class LoanCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datesRange: ''
    };
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({[name]: value});
    }
  };

  render() {
    return (
      <Form>
        <Form.Field>
          <DatesRangeInput
            inline={true}
            name="datesRange"
            placeholder="From - To"
            value={this.state.datesRange}
            iconPosition="left"
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
    );
  }
}

export default LoanCalendar;