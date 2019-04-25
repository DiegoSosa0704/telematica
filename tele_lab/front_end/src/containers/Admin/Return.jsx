import React, {Component} from 'react'
import {Divider, Grid, Header, Segment} from "semantic-ui-react";
import LoansReturn from "../../components/Admin/Return/LoansReturn";
import ComponentsReturn from "../../components/Admin/Return/ComponentsReturn";

class ReturnComponents extends Component {
  render() {
    return (
      <Grid centered columns='equal'>
        <Grid.Column>
          <Header as='h2' attached='top'>
            Devoluciones
          </Header>
          <Segment raised>
            <Grid padded relaxed='very' stackable>
              <Grid.Row>
                <Grid.Column>
                  {/*                  <StudentSearchEngine/>*/}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Divider vertical/>
                <Grid.Column>
                  <LoansReturn/>
                </Grid.Column>
                <Grid.Column>
                  <ComponentsReturn/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ReturnComponents