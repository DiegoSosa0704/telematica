import React from 'react'
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {auth} from '../../actions'

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        email: '',
        password: ''
    };

    handleInputChange = (event) => {
        const target = event.target,
            value = target.type ===
            'checkbox' ? target.checked : target.value,
            name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.email, this.state.password);
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to="/"/>
        }
        return (
            <div className='login-form'>
                <style>
                    {`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                    height: 100%;
                    }
                    `}
                </style>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='black' textAlign='center'>
                            Telemática
                        </Header>
                        <Form onSubmit={this.handleSubmit} size='large'>
                            <Segment stacked textAlign='left'>
                                {/*
                                <Form.Field>
                                    <label>Nombre de usuario: </label>
                                    <Form.Input
                                        fluid
                                        type='text'
                                        name='username'
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Field>
                                */}

                                <Form.Field>
                                    <label>Correo eléctronico: </label>
                                    <Form.Input
                                        fluid
                                        type='email'
                                        name='email'
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Contraseña: </label>
                                    <Form.Input
                                        fluid
                                        type='password'
                                        name='password'
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Field>
                                <Button
                                    fluid size='large'
                                    type='submit'
                                >
                                    Iniciar Sesión
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            <Link to='/signup/'>Registrar</Link> nuevo usuario
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)
