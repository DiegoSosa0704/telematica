import React, {Component} from 'react';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Search,
    Segment,
    Sticky,
    Table,
    Visibility
} from 'semantic-ui-react'

class HomePage extends Component {
    render() {
        return (
            <Container>
                <Segment placeholder style={{height: '100%'}}>
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
                    <Segment raised style={{height: '100%'}}>
                        <Grid textAlign='center'>
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column>
                                    <div>
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Visibility>
                                                    <Table unstackable>
                                                        <Table.Header>
                                                            <Table.Row>
                                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                                <Table.HeaderCell>Status</Table.HeaderCell>
                                                                <Table.HeaderCell
                                                                    textAlign='right'>Notes</Table.HeaderCell>
                                                            </Table.Row>
                                                        </Table.Header>
                                                        <Table.Body>
                                                            <Table.Row>
                                                                <Table.Cell>John</Table.Cell>
                                                                <Table.Cell>Approved</Table.Cell>
                                                                <Table.Cell textAlign='right'>None</Table.Cell>
                                                            </Table.Row>
                                                        </Table.Body>
                                                    </Table>
                                                </Visibility>
                                            </Grid.Column>
                                        </Grid>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Segment>
            </Container>
        );
    }
}

export default HomePage;
