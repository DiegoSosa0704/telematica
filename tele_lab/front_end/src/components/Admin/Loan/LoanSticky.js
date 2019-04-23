import React, {Component} from 'react'
import {Button, Card, Divider, Grid, Header, Icon, Input, List, Transition} from "semantic-ui-react";
import LoanTableUser from "../LoanTableUser";
import {connect} from 'react-redux'
import ListSticky from '../../Admin/Loan/ListSticky'
import AcademicSearchEngine from "../../../components/Admin/StudentSearch";
import {loan} from "../../../actions";


class LoanSticky extends Component {
  constructor(props) {
    super(props);
    this.handlerCreateLoan = this.handlerCreateLoan.bind(this)
  }

  handlerCreateLoan() {
    this.props.createLoan(this.props.listComponents, this.props.user)
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
          <LoanTableUser/>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='list'/>
              Componentes
            </Header>
          </Divider>
          <Transition.Group
            as={List}
            animation='scale'
            divided
            ordered
          >
            {listComponents}
          </Transition.Group>
        </Card.Content>
        <Card.Content
          extra>
          <div className='ui two buttons'>
            <Button onClick={this.handlerCreateLoan} color='green'>
              Realizar préstamo
            </Button>
          </div>
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
    createLoan: (components, user) => {
      return dispatch(loan.createLoan(components, user))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanSticky);