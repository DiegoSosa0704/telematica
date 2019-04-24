import React, {Component} from 'react'
import {Divider, Grid, Header, Icon, Label, List, Menu, Segment, Table} from "semantic-ui-react";
import StudentSearchEngine from "../../components/Admin/StudentSearch";

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
                  <Header as='h3'>Préstamos</Header>
                  <List selection divided relaxed>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle'/>
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                        <List.Description as='a'>Updated 10 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle'/>
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                        <List.Description as='a'>Updated 22 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle'/>
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                        <List.Description as='a'>Updated 34 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3'>Componentes</Header>
                  <List selection divided relaxed>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle'/>
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                        <List.Description as='a'>Updated 10 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle'/>
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                        <List.Description as='a'>Updated 22 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle'/>
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                        <List.Description as='a'>Updated 34 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
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