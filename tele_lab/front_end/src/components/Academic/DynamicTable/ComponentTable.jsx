import React from 'react';
import PropTypes from 'prop-types';
import {Pagination, Table} from 'semantic-ui-react'

import {ComponentPageSizeSelect} from './ComponentPageSizeSelect.jsx';
import ComponentRow from "./ComponentRow.jsx";
import {ComponentTableHeader} from "./ComponentTableHeader.jsx";
import {connect} from "react-redux";

class ComponentTable extends React.Component {
  render() {
    if (!this.props.listComponents) {
      return <React.Fragment/>;
    }
    const vehicleRows = this.props.listComponents.map(
      (vehicle, index) => <ComponentRow key={index} vehicle={vehicle} addFavorite={this.props.addFavorite}/>
    );
    return (
      <React.Fragment>
        <ComponentPageSizeSelect
          limit={this.props.limit}
          onChangeLimit={this.props.onChangeLimit}
        />
        Total: {this.props.totalCount}.
        <Table celled selectable sortable>
          <ComponentTableHeader
            column={this.props.column}
            direction={this.props.direction}
            handleSort={this.props.handleSort}
          />

          <Table.Body>
            {vehicleRows}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='8'>
                <Pagination
                  totalPages={this.props.totalPages}
                  activePage={this.props.currentPage}
                  onPageChange={this.props.onChangePage}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    );
  }

}

ComponentTable.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    listComponents: state.loan.listComponents,
  }
};


export default connect(mapStateToProps, null)(ComponentTable)
