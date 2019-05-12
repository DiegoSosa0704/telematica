import React, {Component} from 'react'
import {Button, Card, Divider, Grid, Header, Icon, Input, List, Transition} from "semantic-ui-react";
import LoanTableUser from "../LoanTableUser";
import {connect} from 'react-redux'
import ListSticky from '../../Admin/Loan/ListSticky'
import AcademicSearchEngine from "../../../components/Admin/StudentSearch";
import {loan} from "../../../actions";
import {formatDateTime} from "../../../utils";

/*import {SemanticToastContainer, toast} from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import {store} from "../../../index";*/

class LoanSticky extends Component {
  constructor(props) {
    super(props);
    this.handlerCreateLoan = this.handlerCreateLoan.bind(this);
  }

  handlerCreateLoan() {
    /*setTimeout(() => {
      toast(
        {
          type: 'success',
          icon: 'check',
          title: 'Registro agregado',
          description: 'El prestamo fue realizado satisfactoriamente',
          animation: 'fade left',
          time: 2500,
        }
      );
    }, 300);*/
    let listComponents = [];
    this.props.listComponents.forEach(val => listComponents.push(val.id));
    const dateTime = formatDateTime(new Date());
    this.props.createLoan(listComponents, this.props.user.code, dateTime)
  }

  render() {
    const listComponents = this.props.listComponents.map((component, index) => {
      return (
        <List.Item key={index}>
          <ListSticky component={component}/>
        </List.Item>
      );
    });
    return (
      <Card
        className='cardSticky'
        raised>
        <Card.Content
          className='contentSticky'>
          {/*<SemanticToastContainer/>*/}
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='user'/>
              Usuario
            </Header>
          </Divider>
          <Grid>
            <Grid.Row centered>
              <Input as={AcademicSearchEngine}/>
            </Grid.Row>
          </Grid>
          <Divider/>
          <LoanTableUser/>
        </Card.Content>
        <Card.Content className='contentList'>
          <Header as='h4' textAlign='center'>
            <Icon name='list'/>
            Componentes
          </Header>
          <Transition.Group
            as={List}
            animation='scale'
            celled
            ordered
          >
            {listComponents}
          </Transition.Group>
        </Card.Content>
        <Card.Content
          extra>
          <Button fluid onClick={this.handlerCreateLoan} color='green'>
            Realizar préstamo
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    listComponents: state.loan.components,
    user: state.loan.userLoan
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLoan: (components, academicId, dateStart) => {
      return dispatch(loan.createLoan(components, academicId, dateStart))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanSticky);