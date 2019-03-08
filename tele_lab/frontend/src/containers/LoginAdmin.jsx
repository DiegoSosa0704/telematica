import React, {Component} from 'react'
import {Button, Form, Grid, Header, Segment} from "semantic-ui-react";
import {fakeAuth} from "./HomePage";


class Login extends Component {
    render() {
        return (
            <div className='login-form'>
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                    height: 100%;
                    }
                `}</style>
                <Segment raised style={{minHeight: '90vh'}}>
                    <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                        <Grid.Column style={{maxWidth: 450}}>
                            <Form size='large'>
                                <Segment stacked style={{marginTop: '100px'}}>
                                    <Header as='h1' textAlign='center'>
                                        Login
                                    </Header>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                    />
                                    <Button fluid
                                            size='large'
                                            onClick={this.login}>
                                        Login
                                    </Button>
                                    {/*
                                    <Button fluid
                                            size='large'
                                            as={Link}
                                            to='/protected'
                                    >
                                        Login
                                    </Button>
                                    */}
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
