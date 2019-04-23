import React, {Component} from 'react'
import {Grid, Header, Segment} from "semantic-ui-react";
import ComponentList from "../../components/Academic/DynamicTable/ComponentList";

class ReturnComponents extends Component {
  render() {
    return (
      <Grid centered columns='equal'>
        <Grid.Column>
          <Header as='h2' attached='top'>
            Componentes
          </Header>
          <Segment raised>
            <Grid padded>
              <Grid.Column>

              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ReturnComponents