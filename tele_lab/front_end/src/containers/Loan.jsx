import _ from 'lodash'
import React, {Component} from 'react'
import StudentSearchEngine from '../components/StudentSearch'
import {Divider, Dropdown, Form, Grid, Header, Segment} from "semantic-ui-react";

const caseSensitiveSearch = (options, query) => {
  const re = new RegExp(_.escapeRegExp(query));
  return options.filter(opt => re.test(opt.text))
};

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
];

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
          <Grid padded columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Input as={StudentSearchEngine} placeholder='Código'/>
                  <Divider horizontal>
                    <Header as='h4'>
                      Estudiante
                    </Header>
                  </Divider>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Nombres' placeholder='Nombres'/>
                    <Form.Input fluid label='Apellidos' placeholder='Apellidos'/>
                  </Form.Group>
                  <Form.Field>
                    <label>Programa Académico</label>
                    <Dropdown
                      fluid
                      options={options}
                      placeholder={'Try to search for case or CASE'}
                      search={caseSensitiveSearch}
                      selection
                    />
                  </Form.Field>
                  <Form.Button>Submit</Form.Button>
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
          </Grid>
        </Segment>

      </div>
    );
  }
}

export default Loan