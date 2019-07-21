import React, {Component} from 'react'
import {Table} from "semantic-ui-react";
import HeaderComponentsOfModal from "./HeaderComponentsOfModal";
import RowComponentsOfModal from "./RowComponentsOfModal";

class TableComponentsOfModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const componentRow = this.props.stockComponent.map(
      (component, index) => <RowComponentsOfModal key={index} vehicle={component}/>
    );
    return (
      <Table basic='very' celled collapsing>
        <HeaderComponentsOfModal/>

        <Table.Body>
          {componentRow}
        </Table.Body>

        <Table.Footer>

        </Table.Footer>
      </Table>
    );
  }
}
export default TableComponentsOfModal