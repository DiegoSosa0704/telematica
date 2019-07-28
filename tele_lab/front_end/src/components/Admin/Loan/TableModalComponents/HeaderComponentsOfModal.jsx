import React, {Component} from 'react'
import {Table} from "semantic-ui-react";

class HeaderComponentsOfModal extends Component {
  render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>
            Serial
          </Table.HeaderCell>
          <Table.HeaderCell width={1}>
            Serial UPTc
          </Table.HeaderCell>
          <Table.HeaderCell width={2}>
            Estado
          </Table.HeaderCell>
          <Table.HeaderCell width={2}>
            Almacén
          </Table.HeaderCell>
          <Table.HeaderCell width={2}>
            Observaciones
          </Table.HeaderCell>
          <Table.HeaderCell width={1}>
            Agregar
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
}

export default HeaderComponentsOfModal