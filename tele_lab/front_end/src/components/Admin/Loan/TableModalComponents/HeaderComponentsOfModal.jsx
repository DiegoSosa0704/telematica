import React, {Component} from 'react'
import {Table} from "semantic-ui-react";

class HeaderComponentsOfModal extends Component {
  render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={2}>
            Serial
          </Table.HeaderCell>
          <Table.HeaderCell width={2}>
            Serial UPTc
          </Table.HeaderCell>
          <Table.HeaderCell width={2}>
            Estado
          </Table.HeaderCell>
          <Table.HeaderCell width={2}>
            Agregar
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
}

export default HeaderComponentsOfModal