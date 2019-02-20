import React, {Component} from 'react'
import {Button, Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";
import {fakeAuth} from "../App";
import {Link, Redirect} from "react-router-dom";


class Login extends Component {
    state = {
        redirectToReferrer: false
    };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({redirectToReferrer: true});
        });
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: "/protected"}};
        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }
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
                                        Administrador
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
