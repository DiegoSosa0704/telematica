import React from 'react'
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import {Button, Form, Grid, Header, Message, Segment, Select} from 'semantic-ui-react'
import {auth} from '../../actions'

const typeUser = [
  {key: 'ES', text: 'Estudiante', value: 'ES'},
  {key: 'TE', text: 'Docente', value: 'TE'},
];


class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
  }

  state = {
    first_name: '',
    last_name: '',
    code: '',
    type: '',
    academic_program: '',
    email: '',
    password: '',
    password_2: ''
  };

  getDataAcademicPrograms = () => {
    let listAcademicPrograms = [];
    let listData = this.props.academic_programs;
    if (listData) {
      listData.forEach(function (element) {
        listAcademicPrograms.push({
          key: element.id,
          text: element.name,
          value: element.id
        });
      })
    }
    return listAcademicPrograms
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

  handleInputEmail = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value + "@uptc.edu.co"
    });
    console.log({[target.name]: target.value + "@uptc.edu.co"})
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.password_2) {
      this.props.onSubmit(this.state);
    } else {
      console.log('Las contraseñas no coinciden')
    }
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value});

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
          <Grid.Column style={{maxWidth: 600}}>
            <Header as='h2' color='black' textAlign='center'>
              TaxDuitama
            </Header>
            <Form onSubmit={this.handleSubmit} size='large'>
               <Segment stacked textAlign='left'>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Nombres: </label>
                    <Form.Input
                      fluid
                      type='text'
                      name='first_name'
                      onChange={this.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Apellidos: </label>
                    <Form.Input
                      fluid
                      type='text'
                      name='last_name'
                      onChange={this.handleInputChange}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field
                    control={Select}
                    options={typeUser}
                    label={{children: 'Ocupación', htmlFor: 'form-select-control-type'}}
                    search
                    searchInput={{id: 'form-select-control-gender-type'}}
                    name='type'
                    onChange={this.handleChange}
                  />
                  <Form.Field>
                    <label>Código: </label>
                    <Form.Input
                      fluid
                      type='text'
                      name='code'
                      onChange={this.handleInputChange}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field
                  control={Select}
                  options={this.getDataAcademicPrograms()}
                  label={{
                    children: 'Programa Académico',
                    htmlFor: 'form-select-control-academic-program'
                  }}
                  search
                  searchInput={{id: 'form-select-control-academic-program'}}
                  name='academic_program'
                  onChange={this.handleChange}
                />
                <Form.Field>
                  <label>Correo eléctronico: </label>
                  <Form.Input
                    fluid
                    type='text'
                    name='email'
                    onChange={this.handleInputChange}
                  />
                  <span>@uptc.edu.co</span>
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
