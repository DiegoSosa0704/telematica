import React, {Component} from 'react'
import {Grid, Header, Input, Rail, Segment, Sticky, Visibility} from "semantic-ui-react";
import LoansReturn from "../../components/Admin/Return/LoansReturn";
import {connect} from "react-redux";
import {returnComponent} from "../../actions";
import ModalEndLoan from "../../components/Admin/Return/ModalEndLoan";
import * as PropTypes from 'prop-types'
import LoanInformation from "../../components/Admin/Return/LoanInformation";

const queryParams = ['_limit', 'q', '_page'];
const regex = new RegExp("^[a-zA-Z0-9 ]+$");

class ReturnComponents extends Component {
  state = {
    isLoading: false,
    searchQuery: '',
    context: null,
    q: '',
    _page: 1,
    _limit: 10,
  };

  onBottomVisible = (event) => {
    this.setState({_page: this.state._page + 1});
    if (this.state._page <= Math.ceil(this.props.loansTotalCount / this.state._limit)) {
      this.loadData({_page: this.state._page})
    }
  };

  handleOfChangeInput = (event, {name, value}) => {
    if (value !== '' && !regex.test(value)) {
      this.setState({q: value});
    } else {
      this.onSubmitFilter(value);
    }
  };

  onSubmitFilter = (filter) => {
    if (filter !== this.state.q) {
      this.setState({q: filter, _page: 1});
      this.loadData({q: filter, _page: 1}, true);
      this.props.changeStateItemList(0);
    }
  };

  loadData(params, resetList = false) {
    const current = this.state;
    queryParams.forEach(function (element) {
      if (!(element in params)) {
        params[element] = current[element];
      }
    });
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    this.props.getLoans(query, resetList);
  }

  handleContextRef = ref => this.setState({context: ref});

  componentDidMount() {
    this.loadData({});
  }

  render() {
    return (
      <div ref={this.handleContextRef}>
        <Grid centered columns='equal'>
          <Grid.Column>
            <Header as='h2' attached='top'>
              Devoluciones
            </Header>
            <Segment raised className='segment-return'>
              <ModalEndLoan propEndLoan={this.props.endLoan}/>
              <Grid padded relaxed stackable className='grid-return'>
                <Grid.Row columns={'equal'} className='row-return-components'>
                  <Grid.Column className='column-return-loans'>
                    <Visibility
                      once={false}
                      continuous={false}
                      onBottomVisible={this.onBottomVisible}
                    >
                      <Input loading={this.state.isLoading}
                             icon='users'
                             iconPosition='left'
                             placeholder='Buscar...'
                             onChange={this.handleOfChangeInput}
                      />
                      <LoansReturn loansReturn={this.props.loans}
                      />
                    </Visibility>
                  </Grid.Column>
                  <Grid.Column className='column-return-components'>
                    <Rail className='my_rail' position='right'>
                      <Sticky context={this.state.context} pushing offset={20}>
                        <LoanInformation/>
                      </Sticky>
                    </Rail>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loans: state.returnComponent.loans,
    pendingLoans: state.returnComponent.pendingLoans,
    endLoan: state.returnComponent.endLoan,
    loansTotalCount: state.returnComponent.loansTotalCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPendingLoans: () => {
      return dispatch(returnComponent.getPendingLoans());
    },
    getLoans: (query, resetList) => {
      return dispatch(returnComponent.getLoans(query, resetList));
    },
    changeStateItemList: (indexItem) => {
      return dispatch(returnComponent.changeStateItemList(indexItem));
    }
  };
};

ReturnComponents.propTypes = {
  pendingLoans: PropTypes.array,
  endLoan: PropTypes.bool,
  getPendingLoans: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnComponents)