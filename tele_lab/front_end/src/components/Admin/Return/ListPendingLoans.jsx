import React, {Component} from 'react'
import {Header, List} from "semantic-ui-react";
import ItemLoan from "./ItemLoan";
import {connect} from "react-redux";

class ListPendingLoans extends Component {
  constructor(props) {
    super(props);
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

export default connect(mapStateToProps, null)(ListPendingLoans);
