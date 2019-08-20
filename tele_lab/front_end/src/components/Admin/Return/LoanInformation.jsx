import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Header, Segment, SegmentGroup, Placeholder} from "semantic-ui-react";
import ComponentsReturn from "./ComponentsReturn";
import {connect} from "react-redux";
import DataUserLoan from "../LoanTableUser";
import {changeTypeAcademic} from "../../../utils";

class LoanInformation extends Component {

  render() {
    const PlaceholderDataUser = () => (
      <Placeholder>
        <Placeholder.Line length='long'/>
        <Placeholder.Line length='medium'/>
        <Placeholder.Line length='short'/>
        <Placeholder.Line length='medium'/>
      </Placeholder>
    );

    const ShowDataUser = () => {
      let user = undefined;
      if (this.props.listLoans !== undefined) {
        this.props.listLoans.forEach((item, index) => {
          if (index === this.props.index) {
            user = {
              title: item.academic.first_name + " " + item.academic.last_name,
              description: changeTypeAcademic(item.academic.type),
              code: item.academic.code,
              academic_program: item.academic.academic_program
            };
          }
        })
      }
      if (user !== undefined) {
        return (<DataUserLoan userLoan={user}/>);
      } else {
        return (<PlaceholderDataUser/>);
      }
    };

    return (
      <React.Fragment>
        <SegmentGroup raised>
          <Segment padded>
            <Header as='h3' dividing>Usuario</Header>
            <ShowDataUser/>
          </Segment>
          <Segment padded>
            <ComponentsReturn/>
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
    listLoans: state.returnComponent.pendingLoans,
    index: state.returnComponent.stateItem,
  };
};

export default connect(mapStateToProps, null)(LoanInformation);