import React, {Component} from 'react'
import {Divider, Grid, GridColumn, Header, Image, Label, Modal, Segment} from 'semantic-ui-react'
import TableComponentsOfModal from "./TableModalComponents/TableComponentsOfModal";

class ModalStockComponentContent extends Component {
  state = {stockComponent: undefined};

  componentDidMount() {
    this.patchStockComponent()
  }

  patchStockComponent() {
    if (this.props.component !== undefined) {
      fetch(`/api/v1/loan/stock-components/${this.props.component.id}/`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({stockComponent: data});
          })
        } else {
          response.json().then(error => {
            console.log(`Failed to load data: ${error.message}`);
          });
        }
      });
    }
  }

  render() {
    if (this.state.stockComponent !== undefined) {
      return (
        <React.Fragment>
          <Modal.Header>
            {this.props.component.name}
          </Modal.Header>
          <Modal.Content image>
            <Segment padded='very' raised>
              <Grid columns={2} divided>
                <Grid.Row>
                  <GridColumn textAlign={"center"} width={4}>
                    <Image size='small' src={`../${this.props.component.image}`} wrapped/>
                  </GridColumn>
                  <Grid.Column width={12}>
                    <Modal.Description>
                      <Header dividing>{this.props.component.name}</Header>
                      <p>
                        <b>Tipo: </b> <span>{this.props.component.type_component}</span>
                      </p>
                      <p>
                        <b>Nivel de préstamo: </b> <span>{this.props.component.level}</span>
                      </p>
                      <p>
                        <b>Stock total: </b> <span>{this.props.component.stock}</span>
                      </p>
                      <p>
                        <b>Descripción: </b> <span>{this.props.component.description}</span>
                      </p>
                    </Modal.Description>
                  </Grid.Column>
                </Grid.Row>
                <Divider section/>
                <Grid.Row>
                  <TableComponentsOfModal stockComponent={this.state.stockComponent}/>
                </Grid.Row>
              </Grid>
            </Segment>
          </Modal.Content>
        </React.Fragment>
      );
    } else {
      return (
        <div/>
      );
    }
  }
}

export default ModalStockComponentContent;