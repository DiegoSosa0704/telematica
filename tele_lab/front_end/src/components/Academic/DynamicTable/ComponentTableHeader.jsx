import {Table} from "semantic-ui-react";
import React from "react";

export function ComponentTableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={1} sorted={props.column === 'id' ? props.direction : null}
                          onClick={() => props.handleSort('id')}>
          #
        </Table.HeaderCell>

        <Table.HeaderCell width={1} sorted={props.column === 'name' ? props.direction : null}
                          onClick={() => props.handleSort('name')}>
          Nombre
        </Table.HeaderCell>

        <Table.HeaderCell width={1} sorted={props.column === 'serial' ? props.direction : null}
                          onClick={() => props.handleSort('serial')}>
          Serial
        </Table.HeaderCell>

        <Table.HeaderCell width={1} sorted={props.column === 'uptc_serial' ? props.direction : null}
                          onClick={() => props.handleSort('uptc_serial')}>
          Serial UPTC
        </Table.HeaderCell>

        <Table.HeaderCell width={1} sorted={props.column === 'state' ? props.direction : null}
                          onClick={() => props.handleSort('state')}>
          Estado
        </Table.HeaderCell>

        <Table.HeaderCell width={1} sorted={props.column === 'status' ? props.direction : null}
                          onClick={() => props.handleSort('status')}>
          Estado
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

