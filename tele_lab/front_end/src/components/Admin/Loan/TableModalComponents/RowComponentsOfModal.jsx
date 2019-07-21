import React, {Component} from 'react'
import {Button, Icon, Table} from "semantic-ui-react";

class RowComponentsOfModal extends Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>Serial</Table.Cell>
        <Table.Cell>test</Table.Cell>
        <Table.Cell>test</Table.Cell>
        <Table.Cell>
          <Button size='mini' circular icon onClick={() => console.log('test')}>
            <Icon name="plus"/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default RowComponentsOfModal