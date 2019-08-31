import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Header, Segment, SegmentGroup, Placeholder} from "semantic-ui-react";
import ComponentsReturn from "./ComponentsReturn";
import {connect} from "react-redux";
import DataUserLoan from "../LoanTableUser";
import {changeTypeAcademic} from "../../../utils";

class LoanInformation extends Component {

  render() {
    const ShowDataUser = () => {
      let user = undefined;
      if (this.props.listLoans !== undefined) {
        if (this.props.listLoans.length > 0) {
          this.props.listLoans.forEach((item, index) => {
            if (index === this.props.index) {
              user = {
                title: item.academic.first_name + " " + item.academic.last_name,
                description: changeTypeAcademic(item.academic.type),
                code: item.academic.code,
                academic_program: item.academic.academic_program
              };
            }
          });
        return (<DataUserLoan userLoan={user}/>);
        } else {
          return (<Header as={"h3"}>No se ha seleccionado un préstamo</Header>)
        }
      }
    };

    const ShowComponentsLoan  = () => {
      if (this.props.listLoans !== undefined) {
        if (this.props.listLoans.length > 0) {
          return (<ComponentsReturn/>);
        } else {
          return (<Header as={"h3"}>No se ha seleccionado un préstamo</Header>)
        }
      }
    };

    return (
      <React.Fragment>
        <SegmentGroup raised className={"returnSticky"}>
          <Segment padded className={"segmentDataUser"}>
            <Header as='h3' dividing>Usuario</Header>
            <ShowDataUser/>
          </Segment>
          <Segment padded className={"segmentComponents"}>
            <Header as='h3' dividing>Componentes</Header>
            <ShowComponentsLoan/>
          </Segment>
        </SegmentGroup>
      </React.Fragment>
    );
  }
}

LoanInformation.propTypes = {
  listLoans: PropTypes.array,
  index: PropTypes.number
};

const mapStateToProps = state => {
  return {
    listLoans: state.returnComponent.loans,
    index: state.returnComponent.stateItem,
  };
};

export default connect(mapStateToProps, null)(LoanInformation);