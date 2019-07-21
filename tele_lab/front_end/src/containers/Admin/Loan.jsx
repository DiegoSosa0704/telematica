import React, {Component} from 'react'
import {Grid, Header, Rail, Segment, Sticky} from "semantic-ui-react";
import ComponentList from "../../components/Academic/DynamicTable/ComponentList";
import LoanSticky from "../../components/Admin/Loan/LoanSticky";
import ModalStockComponent from "../../components/Admin/Loan/ModalStockComponent";
import {store} from "../../index";

class Loan extends Component {
  state = {searchQuery: '', context: null};
  handleContextRef = ref => this.setState({context: ref});

  render() {
    return (
      <div ref={this.handleContextRef}>
        <Grid centered columns='equal'>
          <Grid.Column width={11}>
            <Header as='h2' attached='top'>
              Préstamos
            </Header>
            <Segment raised>
              <Grid padded>
                <Grid.Row>
                  <Grid.Column>
                    <ModalStockComponent/>
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