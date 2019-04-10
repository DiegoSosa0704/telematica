import React, {Component} from 'react'
import {Divider, Form, Grid, Header, Input, Rail, Segment, Sticky} from "semantic-ui-react";
import AcademicSearchEngine from "../../components/Admin/StudentSearch";
import Vehicle from '../../Vehicle/VehicleList'

class Loan extends Component {
  state = {searchQuery: '', context: null};
  handleContextRef = ref => this.setState({context: ref});

  render() {
    return (
      <div ref={this.handleContextRef}>
        <Header as='h1'>Prestamos</Header>
        <Grid columns='equal'>
          <Grid.Column width={11}>
            <Segment raised>
              <Grid padded>
                <Grid.Row>
                  <Grid.Column>
                    <Form>
                      <Divider horizontal>
                        <Header as='h4'>
                          Usuario
                        </Header>
                      </Divider>
                      <Form.Field>
                        <label>Usuario</label>
                        <Input as={AcademicSearchEngine}/>
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Divider horizontal>
                      <Header as='h4'>
                        Equipos
                      </Header>
                    </Divider>
                    <Vehicle/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Form.Button>Submit</Form.Button>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Rail className='my_rail' position='right'>
              <Sticky context={this.state.context}
                      bottomOffset={50}
                      offset={50}
                      pushing
              >
                <Segment raised>
                  <Header as='h3'>Stuck Content</Header>
                </Segment>
              </Sticky>
            </Rail>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Loan