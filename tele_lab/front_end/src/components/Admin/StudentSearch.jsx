import _ from 'lodash'
import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import {loan} from "../../actions";
import {connect} from "react-redux";
import LoanTableUser from '../../components/Admin/LoanTableUser'


class StudentSearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false, results: [], value: '', object: {}}
  }

  componentWillMount() {
    this.props.getUsers();
    this.resetComponent()
  }

  resetComponent = () => this.setState({isLoading: false, results: [], value: '', object: {}});

  handleResultSelect = (e, {result}) => {
    console.log(result);
    this.setState({object: result, value: result.code})
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
    let table;
    if (this.state.object) {
      table = <LoanTableUser dataUser={this.state.object}/>;
    }
    return (
      <div>
        <Search
          loading={this.state.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
          results={this.state.results}
          value={this.state.value}
        />
        {table}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listUsers: state.loan.users
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      return dispatch(loan.getListUsers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentSearchEngine)
