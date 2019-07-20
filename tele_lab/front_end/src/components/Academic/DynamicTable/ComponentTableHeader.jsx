import {Table} from "semantic-ui-react";
import React from "react";

export function ComponentTableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        {/*<Table.HeaderCell width={1} sorted={props.column === 'id' ? props.direction : null}
                          onClick={() => props.handleSort('id')}>
          ID
        </Table.HeaderCell>*/}

        <Table.HeaderCell width={4} sorted={props.column === 'name' ? props.direction : null}
                          onClick={() => props.handleSort('name')}>
          Nombre
        </Table.HeaderCell>

        <Table.HeaderCell width={2} sorted={props.column === 'type_component' ? props.direction : null}
                          onClick={() => props.handleSort('type_component')}>
          Tipo
        </Table.HeaderCell>

        <Table.HeaderCell width={2} sorted={props.column === 'level' ? props.direction : null}
                          onClick={() => props.handleSort('level')}>
          Nivel
        </Table.HeaderCell>

        <Table.HeaderCell width={1}>
          Disponible
        </Table.HeaderCell>

        <Table.HeaderCell width={1}>
          Stock total
        </Table.HeaderCell>

{/*        <Table.HeaderCell width={1}>
        </Table.HeaderCell>*/}
      </Table.Row>
    </Table.Header>
  )
}

