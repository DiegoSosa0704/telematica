import {Table} from "semantic-ui-react";
import React from "react";

export function ComponentTableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={1} sorted={props.column === 'id' ? props.direction : null}
                          onClick={() => props.handleSort('id')}>
          ID
        </Table.HeaderCell>

        <Table.HeaderCell width={4} sorted={props.column === 'name' ? props.direction : null}
                          onClick={() => props.handleSort('name')}>
          Nombre
        </Table.HeaderCell>

        <Table.HeaderCell width={1} sorted={props.column === 'status' ? props.direction : null}
                          onClick={() => props.handleSort('status')}>
          Estado
        </Table.HeaderCell>

        <Table.HeaderCell width={1} sorted={props.column === 'stock' ? props.direction : null}
                          onClick={() => props.handleSort('stock')}>
          Stock
        </Table.HeaderCell>

        <Table.HeaderCell width={1}>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

