import React from "react";
import {Table} from "semantic-ui-react";
import PropTypes from "prop-types";

export const ComponentRow = (props) => (
  <Table.Row>
    <Table.Cell>{props.vehicle.id}</Table.Cell>
    <Table.Cell>{props.vehicle.name}</Table.Cell>
    <Table.Cell>{props.vehicle.serial}</Table.Cell>
    <Table.Cell>{props.vehicle.uptc_serial}</Table.Cell>
    <Table.Cell>{props.vehicle.state}</Table.Cell>
    <Table.Cell>{props.vehicle.status}</Table.Cell>
  </Table.Row>
);

ComponentRow.propTypes = {
  vehicle: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
};
