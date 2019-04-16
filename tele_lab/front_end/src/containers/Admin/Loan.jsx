import React, {Component} from 'react'
import {Button, Divider, Form, Grid, Header, Input, Rail, Segment, Sticky} from "semantic-ui-react";
import AcademicSearchEngine from "../../components/Admin/StudentSearch";
import ComponentList from "../../components/Academic/DynamicTable/ComponentList";
import LoanSticky from "../../components/Admin/Loan/LoanSticky";

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
                    <ComponentList/>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Button>
                    Submit
                  </Button>
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
                <LoanSticky/>
              </Sticky>
            </Rail>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Loan