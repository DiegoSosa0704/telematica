import React from "react";
import {Table} from "semantic-ui-react";
import PropTypes from "prop-types";
import {loan} from "../../../actions";
import {connect} from "react-redux";
import {store} from "../../../index";


class ComponentRow extends React.Component {
  state = {available: false};

  constructor(props) {
    super(props);
    this.addToLoan = this.addToLoan.bind(this)
  }

  addToLoan(component) {
    if (!store.getState().loan.addComponentState) {
      this.props.addComponentToLoan(component);
    }
  }

  selectRow(component) {
    this.props.selectedComponentOnLoan(component);
    this.props.statusModalSelectedComponent(true);
  }

  componentDidMount() {
    if (this.props.vehicle.available > 0) {
      this.setState({available: true})
    } else {
      this.setState({available: false})
    }
  }

  render() {
    return (
      <Table.Row onClick={() => this.selectRow(this.props.vehicle)} style={{cursor: "pointer"}}>
        <Table.Cell>{this.props.vehicle.name}</Table.Cell>
        <Table.Cell>{this.props.vehicle.type_component}</Table.Cell>
        <Table.Cell>{this.props.vehicle.level}</Table.Cell>
        <Table.Cell>
            {this.props.vehicle.available}
        </Table.Cell>
        <Table.Cell>{this.props.vehicle.stock}</Table.Cell>
      </Table.Row>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComponentToLoan: (component) => {
      return dispatch(loan.addToLoan(component));
    },
    selectedComponentOnLoan: (component) => {
      return dispatch(loan.selectedComponentOnLoan(component));
    },
    statusModalSelectedComponent: (state) => {
      return dispatch(loan.statusModalSelectedComponent(state));
    },
  };
};

ComponentRow.propTypes = {
  vehicle: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
  addComponentToLoan: PropTypes.func,
  selectedComponentOnLoan: PropTypes.func,
  statusModalSelectedComponent: PropTypes.func
};

export default connect(null, mapDispatchToProps)(ComponentRow)

