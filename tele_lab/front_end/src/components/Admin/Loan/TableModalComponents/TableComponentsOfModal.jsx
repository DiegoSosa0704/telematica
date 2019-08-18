import React, {Component} from 'react'
import {Table} from "semantic-ui-react";
import HeaderComponentsOfModal from "./HeaderComponentsOfModal";
import RowComponentsOfModal from "./RowComponentsOfModal";
import PropTypes from 'prop-types'

class TableComponentsOfModal extends Component {
  render() {
    const componentRow = this.props.stockComponent.map(
      (component, index) => <RowComponentsOfModal key={index} component={component}/>
    );
    return (
      <Table celled fixed singleLine unstackable>
        <HeaderComponentsOfModal/>
        <Table.Body>
          {componentRow}
        </Table.Body>
      </Table>
    );
  }
}

TableComponentsOfModal.propTypes = {
  stockComponent: PropTypes.array
};

export default TableComponentsOfModal