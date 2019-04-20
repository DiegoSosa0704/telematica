import _ from 'lodash'
import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import {loan} from "../../actions";
import {connect} from "react-redux";

class StudentSearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false, results: [], value: '', object: {}};
  }

  componentWillMount() {
    this.resetComponent();
    this.props.getUsers();
  }

  resetComponent = () => {
    this.setState({isLoading: false, results: [], value: '', object: {}});
  };

  handleResultSelect = (e, {result}) => {
    this.setState({object: result, value: result.code});
    this.props.getDataUser(result);
  };

  handleSearchChange = (e, {value}) => {
    this.setState({isLoading: true, value});

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.code);
      this.setState({
        isLoading: false,
        results: _.filter(this.props.listUsers, isMatch),
      })
    }, 300)
  };

  render() {
    return (
      <div>
        <Search
          noResultsMessage="Sin resultados."
          loading={this.state.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
          results={this.state.results}
          value={this.state.value}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listUsers: state.loan.users,
    userLoan: state.loan.userLoan
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      return dispatch(loan.getListUsers());
    },
    getDataUser: (data) => {
      return dispatch(loan.getDataUserLoan(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentSearchEngine)
