import React, {Component} from 'react'
import {Button, Grid, Header, Image, Modal, Rail, Segment, Sticky} from "semantic-ui-react";
import ComponentList from "../../components/Academic/DynamicTable/ComponentList";
import LoanSticky from "../../components/Admin/Loan/LoanSticky";

class Loan extends Component {
  state = {searchQuery: '', context: null};
  handleContextRef = ref => this.setState({context: ref});

  render() {
    return (
      <div ref={this.handleContextRef}>
        <Grid centered columns='equal'>
          <Grid.Column width={11}>
            <Header as='h2' attached='top'>
              Componentes
            </Header>
            <Segment raised attached>
              <Grid padded>
                <Grid.Row>
                  <Grid.Column>
                    <ComponentList/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Rail className='my_rail' position='right'>
              <Sticky context={this.state.context}
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