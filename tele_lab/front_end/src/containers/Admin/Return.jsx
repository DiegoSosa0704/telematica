import React, {Component} from 'react'
import {Divider, Grid, Header, Input, Segment} from "semantic-ui-react";
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
          <Segment raised className='segment-return'>
            <Grid padded relaxed='very' stackable className='grid-return'>
              <Grid.Row>
                <Grid.Column>
                  <Header as='h3' content='Usuario'/>

                  <Input loading onChange={(e, data) => console.log(data.value)} placeholder='Buscar...' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} className='row-return-components'>
                <Divider vertical/>
                <Grid.Column className='column-return-loans'>
                  <LoansReturn/>
                </Grid.Column>
                <Grid.Column className='column-return-components'>
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