import React, {Component} from 'react'
import {Button, Card, Divider, Grid, Header, Icon, Input, List, Transition} from "semantic-ui-react";
import {DataUserLoan} from "../LoanTableUser";
import {connect} from 'react-redux'
import ListSticky from '../../Admin/Loan/ListSticky'
import AcademicSearchEngine from "../../../components/Admin/StudentSearch";
import {loan} from "../../../actions";

class LoanSticky extends Component {
  constructor(props) {
    super(props);
    this.handlerCreateLoan = this.handlerCreateLoan.bind(this);
  }

  handlerCreateLoan() {
    let listComponents = [];
    this.props.listComponents.forEach(val => listComponents.push(val.id));
    this.props.createLoan(listComponents, this.props.user.code);
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
          <DataUserLoan userLoan={this.props.user}/>
        </Card.Content>
        <Card.Content className='contentList'>
          <Header as='h4' textAlign='center'>
            <Icon name='list'/>
            Componentes
          </Header>
          {Object.keys(this.props.listComponents).length > 0 ?
            <Transition.Group
              as={List}
              animation='scale'
              celled
              ordered
            >
              {listComponents}
            </Transition.Group> :
            <Header as='h3' disabled textAlign='center'>
              No ha seleccionado ningun componente
            </Header>
          }
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
    createLoan: (components, academicId) => {
      return dispatch(loan.createLoan(components, academicId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanSticky);