import React, {Component} from 'react'
import {Button, Icon, Label, Table} from "semantic-ui-react";

class RowComponentsOfModal extends Component {
  render() {
    const selectStatus = (status) => {
      if (status === "AV") {
        return (
          <Label color='green' horizontal>
            Disponible
          </Label>
        )
      } else if (status === "OL") {
        return (
          <Label color='yellow' horizontal>
            En prestamo
          </Label>
        )
      } else if (status === "IM") {
        return (
          <Label color='orange' horizontal>
            En mantenimiento
          </Label>
        )
      } else if (status === "NA") {
        return (
          <Label color='red' horizontal>
            No disponible
          </Label>
        )
      } else {
        return "NA"
      }
    };
    console.log(this.props.component);

    return (
      <Table.Row>
        <Table.Cell>{this.props.component.serial}</Table.Cell>
        <Table.Cell>{this.props.component.uptc_serial}</Table.Cell>
        <Table.Cell>
          {selectStatus(this.props.component.status)}
        </Table.Cell>
        <Table.Cell>
          {this.props.component.observation === '' ? 'N/A' : this.props.component.observation}
        </Table.Cell>
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