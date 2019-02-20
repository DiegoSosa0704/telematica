import React, {Component} from 'react';
import {Button, Container, Segment} from 'semantic-ui-react'

class HomePage extends Component {
    render() {
        return (
            <div>
                <Segment style={{minHeight: '90vh'}}>
                    <Button>Recomendador</Button>

                </Segment>
            </div>
        );
    }
}

export default HomePage;
