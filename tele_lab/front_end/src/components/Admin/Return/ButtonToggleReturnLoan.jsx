import React, {Component} from 'react'
import {Radio} from 'semantic-ui-react'
import {connect} from "react-redux";
import {returnComponent} from "../../../actions";
import {store} from "../../../index";
import * as PropTypes from 'prop-types'

class ButtonToggleReturnLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  patchLoanComponent() {
    this.props.endLoanFunc(this.state.active ? 0 : 1, this.props.index);
    if (!store.getState().returnComponent.endLoan) {
      fetch(`/api/v1/loan/component/update/${this.props.component.loan_id}/`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          state: this.state.active ? 0 : 1,
        }),
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.changeState(data.state);
          })
        } else {
          response.json().then(error => {
            console.log(`Failed to load data: ${error.message}`);
          });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.changeState(nextProps.component.state)
  }

  componentDidMount() {
    this.changeState(this.props.component.state)
  }

  changeState = (state) => {
    switch (state) {
      case 0:
        this.setState({active: false});
        break;
      case 1:
        this.setState({active: true});
        break;
      default:
        this.setState({active: false});
        break;
    }
  };

  handleClick = () => {
    this.patchLoanComponent()
  };

  render() {
    const {active} = this.state;
    return (
      <Radio
        toggle
        checked={active}
        onClick={this.handleClick}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    endLoan: state.returnComponent.endLoan,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    endLoanFunc: (state, index) => {
      return dispatch(returnComponent.endLoan(state, index));
    },
  };
};

ButtonToggleReturnLoan.propTypes = {
  component: PropTypes.object,
  endLoan: PropTypes.bool,
  endLoanFunc: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonToggleReturnLoan);