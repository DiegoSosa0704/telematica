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
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_2: ''
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
        if (this.state.password === this.state.password_2) {
            this.props.onSubmit(this.state);
        } else {
            console.log('Las contraseñas no coinciden')
        }
    }

    render() {
        if (this.props.signup) {
            return <Redirect to="/signup/message/"/>

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
                            TaxDuitama
                        </Header>
                        <Form onSubmit={this.handleSubmit} size='large'>
                            <Segment stacked textAlign='left'>
                                <Form.Field>
                                    <label>Nombre: </label>
                                    <Form.Input
                                        fluid
                                        type='text'
                                        name='first_name'
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Apellido: </label>
                                    <Form.Input
                                        fluid
                                        type='text'
                                        name='last_name'
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Field>
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
                                <Form.Field>
                                    <label>Repetir Contraseña: </label>
                                    <Form.Input
                                        fluid
                                        type='password'
                                        name='password_2'
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Field>
                                <Button
                                    fluid size='large'
                                    type='submit'
                                >
                                    Crear Usuario
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            <Link to='/login/'>Iniciar Sesión</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        signup: state.auth.signup
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (states) => {
            return dispatch(auth.signUp(states));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)
