import React, {Component} from 'react';
import {Container, Grid, Header, Icon, Menu, Search, Segment, Table} from 'semantic-ui-react'

class HomePage extends Component {
    render() {
        return (
            <div>
                <Segment placeholder style={{minHeight: '88vh'}}>
                    <Grid columns={1} stackable textAlign='center'>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header icon>
                                    <Icon name='search'/>
                                    Buscar Historial
                                </Header>

                                <Search placeholder='Código'/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Segment raised style={{overflow: 'auto', maxHeight: 450}}>
                        <Grid textAlign='center'>
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column>
                                    <Table unstackable>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                <Table.HeaderCell>Status</Table.HeaderCell>
                                                <Table.HeaderCell>Notes</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>John</Table.Cell>
                                                <Table.Cell>Approved</Table.Cell>
                                                <Table.Cell >None</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>John</Table.Cell>
                                                <Table.Cell>Approved</Table.Cell>
                                                <Table.Cell >None</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>John</Table.Cell>
                                                <Table.Cell>Approved</Table.Cell>
                                                <Table.Cell >None</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>John</Table.Cell>
                                                <Table.Cell>Approved</Table.Cell>
                                                <Table.Cell >None</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>John</Table.Cell>
                                                <Table.Cell>Approved</Table.Cell>
                                                <Table.Cell >None</Table.Cell>
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
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Segment>
            </div>
        );
    }
}

export default HomePage;
