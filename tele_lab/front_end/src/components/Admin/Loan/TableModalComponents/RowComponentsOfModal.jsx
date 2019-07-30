import React, {Component} from 'react'
import {Button, Icon, Label, Table} from "semantic-ui-react";
import {loan} from "../../../../actions";
import {connect} from "react-redux";
import _ from "lodash"

class RowComponentsOfModal extends Component {

  state = {selectedComponent: false};

  constructor(props) {
    super(props);
    this.addComponent = this.addComponent.bind(this)
  }

  componentDidMount() {
    if (this.props.loanComponents !== undefined) {
      let findComponent = _.find(this.props.loanComponents, ['id', this.props.component.id]);
      if (findComponent !== undefined) {
        this.setState({selectedComponent: true})
      }
    }
  }

  addComponent(component) {
    if (this.state.selectedComponent === false) {
      this.props.addComponentToLoan(component);
      this.setState({selectedComponent: true})
    }
  }

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
    const componentPlace = (places) => {
      return places.place_object.name + ", " + places.name
    };
    const componentObservation = (observation) => {
      return observation === '' ? 'N/A' : observation
    };
    return (
      <Table.Row active={this.state.selectedComponent}>
        <Table.Cell>{this.props.component.serial}</Table.Cell>
        <Table.Cell>{this.props.component.uptc_serial}</Table.Cell>
        <Table.Cell>
          {selectStatus(this.props.component.status)}
        </Table.Cell>
        <Table.Cell>
          {componentPlace(this.props.component.place_object)}
        </Table.Cell>
        <Table.Cell
          title={componentObservation(this.props.component.observation)}>
          {componentObservation(this.props.component.observation)}
        </Table.Cell>
        <Table.Cell>
          <Button color={"green"} size='mini' circular icon onClick={() => this.addComponent(this.props.component)}>
            <Icon name="plus"/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComponentToLoan: (component) => {
      return dispatch(loan.addToLoan(component));
    },
  }
};

const mapStateToProps = (state) => {
  return {
    loanComponents: state.loan.components,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RowComponentsOfModal)