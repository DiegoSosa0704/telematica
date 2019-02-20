import React, {Component} from 'react'
import {Grid, Header, Icon, Image, Segment, Container} from 'semantic-ui-react'

class Schedule extends Component {
    render() {
        return (
            <div>
                <Segment raised style={{minHeight: '88vh'}}>
                    <Grid centered columns={2}>
                        <Grid.Column textAlign='center'>
                            <Header as='h2' textAlign='center'>
                                <Icon name='calendar'/>
                                <Header.Content>Horario</Header.Content>
                            </Header>
                            <Image
                                src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default Schedule