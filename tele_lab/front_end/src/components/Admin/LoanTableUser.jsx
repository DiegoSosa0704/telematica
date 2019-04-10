import React, {Component} from 'react'
import {Header, Image, Segment, Table} from "semantic-ui-react";

class LoanTableUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment>
        <Table basic='very' celled collapsing unstackable>
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
                    {this.props.dataUser.title}
                    <Header.Subheader>{this.props.dataUser.description}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{this.props.dataUser.code}</Table.Cell>
              <Table.Cell>{this.props.dataUser.academic_program}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default LoanTableUser;