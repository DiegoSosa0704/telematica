import React from "react";
import {Button, Icon, Table} from "semantic-ui-react";
import PropTypes from "prop-types";
import {changeStatusComponent} from '../../../utils'
import {loan} from "../../../actions";
import {connect} from "react-redux";
import {store} from "../../../index";


class ComponentRow extends React.Component {
  constructor(props) {
    super(props);
    this.addToLoan = this.addToLoan.bind(this)
  }

  addToLoan(component) {
    if (!store.getState().loan.addComponentState) {
      this.props.addComponentToLoan(component);
      this.props.getListComponents(store.getState().loan.lastQuery, store.getState().loan.components)
    }
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.vehicle.id}</Table.Cell>
        <Table.Cell>{this.props.vehicle.name}</Table.Cell>
        <Table.Cell>{changeStatusComponent(this.props.vehicle.status)}</Table.Cell>
        <Table.Cell>3</Table.Cell>
        <Table.Cell>
          <Button size='mini' circular icon onClick={() => this.addToLoan(this.props.vehicle)}>
            <Icon name="plus"/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    query: state.loan.lastQuery,
    components: state.loan.components,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addComponentToLoan: (component) => {
      return dispatch(loan.addToLoan(component));
    },
    getListComponents: (query, post) => {
      return dispatch(loan.listComponents(query, post));
    },
  };
};

ComponentRow.propTypes = {
  vehicle: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentRow)

