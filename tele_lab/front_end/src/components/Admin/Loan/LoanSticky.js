import React, {Component} from 'react'
import {Button, Card, Divider, Grid, Header, Icon, Input, Label, List, Segment, Transition} from "semantic-ui-react";
import LoanTableUser from "../LoanTableUser";
import {connect} from 'react-redux'
import ListSticky from '../../Admin/Loan/ListSticky'
import AcademicSearchEngine from "../../../components/Admin/StudentSearch";


class LoanSticky extends Component {
  constructor(props) {
    super(props);
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
            <Button color='green'>
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
    listComponents: state.loan.components
  };
};

export default connect(mapStateToProps, null)(LoanSticky);