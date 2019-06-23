import React from 'react'
import {Button, Header, Icon, Image, Modal} from 'semantic-ui-react'

const ModalStockComponentContent = (props) => (
  <React.Fragment>
    <Modal.Header>{props.component.name}</Modal.Header>
    <Modal.Content image scrolling>
      <Image size='medium' src='/images/wireframe/image.png' wrapped/>
      <Modal.Description>
        <Header>Modal Header</Header>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='chevron right'/>
      </Button>
    </Modal.Actions>
  </React.Fragment>
);

export default ModalStockComponentContent