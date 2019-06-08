import React, {Component} from 'react'
import {Header, List} from "semantic-ui-react";
import ItemLoan from "./ItemLoan";
import {connect} from "react-redux";
import {returnComponent} from "../../../actions";
import _ from 'lodash'

class ListPendingLoans extends Component {

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.pendingLoans !== this.props.pendingLoans) {
      if (!_.isEqual(nextProps.pendingLoans, this.props.pendingLoans)) {
        this.props.changeStateItemList(0);
      }
    }
  }

  render() {
    if (this.props.pendingLoans.length > 0) {
      const listLoans = this.props.pendingLoans.map((component, index) => {
        return (
          <React.Fragment key={index}>
            <ItemLoan component={component} indexItem={index} stateItem={this.props.stateItem}/>
          </React.Fragment>
        );
      });
      return (
        <List animated selection divided>
          {listLoans}
        </List>
      );
    } else {
      return (
        <Header as='h3' disabled>
          No hay préstamos pendientes.
        </Header>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    stateItem: state.returnComponent.stateItem,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeStateItemList: (indexItem) => {
      return dispatch(returnComponent.changeStateItemList(indexItem));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPendingLoans);
