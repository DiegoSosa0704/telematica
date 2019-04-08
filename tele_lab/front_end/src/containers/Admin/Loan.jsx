import React, {Component} from 'react'
import {Divider, Form, Grid, Header, Input, Segment} from "semantic-ui-react";
import AcademicSearchEngine from "../../components/Admin/StudentSearch";
import LoanTableUser from '../../components/Admin/LoanTableUser'

const stateOptions = [
  {key: 'AL', value: 'AL', text: 'Router'},
  {key: 'CO', value: 'CO', text: 'SonicWall'},
  {key: 'AR', value: 'AR', text: 'Arduino Uno'},
];

class Loan extends Component {
  state = {searchQuery: ''};
  handleChange = (e, {searchQuery, value}) => this.setState({searchQuery, value});
  handleSearchChange = (e, {searchQuery}) => this.setState({searchQuery});

  render() {
    const {searchQuery, value} = this.state;
    return (
      <div>
        <Header as='h1'>Prestamos</Header>
        <Segment raised>
          <Grid padded>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form>
                  <Divider horizontal>
                    <Header as='h4'>
                      Usuairo
                    </Header>
                  </Divider>
                  <Form.Field>
                    <label>Usuario</label>
                    <Input as={AcademicSearchEngine}/>
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Divider horizontal>
                    <Header as='h4'>
                      Equipos
                    </Header>
                  </Divider>
                  <Form.Dropdown
                    fluid
                    multiple
                    onChange={this.handleChange}
                    onSearchChange={this.handleSearchChange}
                    options={stateOptions}
                    placeholder='State'
                    search
                    searchQuery={searchQuery}
                    selection
                    value={value}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Form.Button>Submit</Form.Button>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default Loan