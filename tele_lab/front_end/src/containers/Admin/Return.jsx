import React, {Component} from 'react'
import {Grid, Header, Icon, Label, Menu, Segment, Table} from "semantic-ui-react";
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
            <Grid padded>
              <Grid.Row>
                <Grid.Column>
                  <StudentSearchEngine/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>

                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon>First</Label>
                      </Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                          <Menu.Item as='a' icon>
                            <Icon name='chevron left'/>
                          </Menu.Item>
                          <Menu.Item as='a'>1</Menu.Item>
                          <Menu.Item as='a'>2</Menu.Item>
                          <Menu.Item as='a'>3</Menu.Item>
                          <Menu.Item as='a'>4</Menu.Item>
                          <Menu.Item as='a' icon>
                            <Icon name='chevron right'/>
                          </Menu.Item>
                        </Menu>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ReturnComponents