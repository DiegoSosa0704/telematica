import React, {Component} from 'react'
import {Table} from "semantic-ui-react";
import HeaderComponentsOfModal from "./HeaderComponentsOfModal";
import RowComponentsOfModal from "./RowComponentsOfModal";

class TableComponentsOfModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const componentRow = this.props.stockComponent.map(
      (component, index) => <RowComponentsOfModal key={index} component={component}/>
    );
    return (
      <Table celled fixed singleLine>
        <HeaderComponentsOfModal/>
        <Table.Body>
          {componentRow}
        </Table.Body>
      </Table>
    );
  }
}
export default TableComponentsOfModal