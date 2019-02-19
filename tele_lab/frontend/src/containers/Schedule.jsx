import React, {Component} from 'react'
import {Grid, Header, Icon, Image, Segment} from 'semantic-ui-react'

class Schedule extends Component {
    render() {
        return (
            <Grid centered columns={3}>
                <Grid.Column>
                    <Segment stacked>
                        <Header as='h2' textAlign='center'>
                            <Icon name='calendar'/>
                            <Header.Content>Horario</Header.Content>
                        </Header>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Schedule