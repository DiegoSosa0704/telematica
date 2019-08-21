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
    _page: 0,
    _limit: 20,
  };

  onBottomVisible = (event) => {
    this.setState({_page: this.state._page + 1});
    this.loadData({_page: this.state._page})
  };

  handleOfChangeInput = (event, {name, value}) => {
    if (regex.test(value)) {
      this.onSubmitFilter(value);
    }
  };

  onSubmitFilter = (filter) => {
    if (filter !== this.state.q) {
      this.setState({q: filter, _page: 1});
      this.loadData({q: filter, _page: 1});
    }
  };

  loadData(params) {
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
    this.props.getLoans(query);
  }

  handleContextRef = ref => this.setState({context: ref});

  constructor(props) {
    super(props);
    // this.getLoanSearch = this.getLoanSearch.bind(this)
  }

  componentDidMount() {
    this.loadData({});
    // this.props.getPendingLoans();
  }

  /*getLoanSearch(data) {
    this.setState({isLoading: true});
    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = result => re.test(result.academic.code);
      let results = _.filter(this.props.pendingLoans, isMatch);
      this.setState({result: results, isLoading: false});
    }, 300)
  }*/

  render() {
    const { _page } = this.state;
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
                        /*onChange={_.debounce((event, data) => this.getLoanSearch(data), 500, {leading: true})}*/
                             onChange={this.handleOfChangeInput}
                      />
                      <LoansReturn loansReturn={this.props.loans}
                      />
                    </Visibility>
                  </Grid.Column>
                  <Grid.Column className='column-return-components'>
                    <Rail className='my_rail' position='right'>
                      <Sticky context={this.state.context} pushing offset={20}>
                        {_page.toString()}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPendingLoans: () => {
      return dispatch(returnComponent.getPendingLoans());
    },
    getLoans: (query) => {
      return dispatch(returnComponent.getLoans(query));
    },
  };
};

ReturnComponents.propTypes = {
  pendingLoans: PropTypes.array,
  endLoan: PropTypes.bool,
  getPendingLoans: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnComponents)