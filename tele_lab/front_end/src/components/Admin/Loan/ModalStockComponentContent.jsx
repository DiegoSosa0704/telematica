import React from 'react'
import {Button, Divider, Header, Icon, Image, Modal} from 'semantic-ui-react'
import {connect} from "react-redux";
import {loan} from "../../../actions";

const ModalStockComponentContent = (props) => (
  <React.Fragment>
    <Modal.Header>Componente</Modal.Header>
    <Modal.Content image scrolling>
      <Image size='medium' src={`../${props.component.image}`} wrapped/>
      <Modal.Description>
        <Header>{props.component.name}</Header>
        <p>
          <b>Tipo: </b> <span>{props.component.type_component}</span>
        </p>
        <p>
          <b>Nivel de préstamo: </b> <span>{props.component.level}</span>
        </p>
        <p>
          <b>Stock total: </b> <span>{props.component.stock}</span>
        </p>
        <p>
          <b>Descripción: </b> <span>{props.component.description}</span>
        </p>
        <Divider section/>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='chevron right'/>
      </Button>
    </Modal.Actions>
  </React.Fragment>
);

const mapDispatchToProps = dispatch => {
  return {
    getStockComponent: (componentId) => {
      return dispatch(loan.getStockComponents(componentId));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalStockComponentContent)