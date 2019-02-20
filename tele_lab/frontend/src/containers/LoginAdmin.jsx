import React, {Component} from 'react'
import {Button, Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";


class Login extends Component {
    render() {
        return (
            <div className='login-form'>
                <Segment raised style={{minHeight: '88vh'}}>
                    <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                        <Grid.Column style={{maxWidth: 450}}>
                            <Header as='h1' textAlign='center'>
                                Administrador
                            </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                    />

                                    <Button fluid size='large'>
                                        Login
                                    </Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default Login
