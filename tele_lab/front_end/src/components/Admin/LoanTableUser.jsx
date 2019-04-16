import React, {Component} from 'react'
import {Header, Table} from "semantic-ui-react";
import {connect} from "react-redux";

class LoanTableUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table celled unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Usuario</Table.HeaderCell>
              <Table.HeaderCell>Código</Table.HeaderCell>
              <Table.HeaderCell>Programa Académico</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {this.props.userLoan.title}
                    <Header.Subheader>{this.props.userLoan.description}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{this.props.userLoan.code}</Table.Cell>
              <Table.Cell>{this.props.userLoan.academic_program}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoan: state.loan.userLoan,
  }
};

export default connect(mapStateToProps, null)(LoanTableUser);