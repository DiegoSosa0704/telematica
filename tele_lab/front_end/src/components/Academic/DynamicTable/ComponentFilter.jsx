import React from 'react';
import PropTypes from 'prop-types';
import {Form, Popup} from 'semantic-ui-react';

const regex = new RegExp("^[a-zA-Z0-9 ]+$");

export class ComponentFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      filterValid: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event, {name, value}) {
    if (value !== '' && !regex.test(value)) {
      this.setState({[name]: value, filterValid: false});
    } else {
      this.setState({[name]: value, filterValid: true});
      this.props.onSubmitFilter(value);
    }
  }

  render() {
    const {filter} = this.state;
    let popupMessage = '';
    if (!this.state.filterValid) {
      popupMessage = 'Carácter no válido.';
    } else if (this.props.totalCount === 0) {
      popupMessage = 'Sin resultados.'
    }

    return (
      <Form>
        <Form.Group>
          <Form.Field>
            <Popup
              trigger={<Form.Input
                placeholder='Componente.'
                name='filter'
                value={filter}
                error={!this.state.filterValid}
                label='Búsqueda'
                onChange={this.handleOnChange}
                icon='search'
                loading={this.props.loading}
              />}
              content={popupMessage}
              on='click'
              open={!this.state.filterValid || this.props.totalCount === 0}
              position='right center'
            />
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

ComponentFilter.propTypes = {
  onSubmitFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};
