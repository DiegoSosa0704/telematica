import React, {Component} from 'react'
import {Header, List} from 'semantic-ui-react'

class LoansReturn extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h3'>Préstamos</Header>
        <List selection divided relaxed>
          <List.Item>
            <List.Icon name='github' size='large' verticalAlign='middle'/>
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
              <List.Description as='a'>Updated 10 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='github' size='large' verticalAlign='middle'/>
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
              <List.Description as='a'>Updated 22 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='github' size='large' verticalAlign='middle'/>
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
              <List.Description as='a'>Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </React.Fragment>
    );
  }
}

export default LoansReturn