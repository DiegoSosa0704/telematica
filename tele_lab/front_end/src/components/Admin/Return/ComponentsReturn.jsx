import React, {Component} from 'react'
import {Header} from "semantic-ui-react";
import {connect} from "react-redux";
import ListComponentsReturn from './ListComponentsReturn'
import * as PropTypes from "prop-types";

class LoansReturn extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as='h3' dividing>Componentes</Header>

        {this.props.componentsLoan !== undefined ?
          <ListComponentsReturn componentsLoan={this.props.componentsLoan}/> :
          <Header as='h3' disabled>
            Seleccione un préstamo
          </Header>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    componentsLoan: state.returnComponent.componentsLoan
  }
};

LoansReturn.propTypes = {
  componentsLoan: PropTypes.array
};

export default connect(mapStateToProps, null)(LoansReturn)