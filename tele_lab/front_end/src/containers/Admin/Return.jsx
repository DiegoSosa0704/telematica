import React, {Component} from 'react'
import {Grid, Header, Input, Rail, Segment, Sticky, Visibility} from "semantic-ui-react";
import LoansReturn from "../../components/Admin/Return/LoansReturn";
import _ from "lodash";
import {connect} from "react-redux";
import {returnComponent} from "../../actions";
import ModalEndLoan from "../../components/Admin/Return/ModalEndLoan";
import * as PropTypes from 'prop-types'
import LoanInformation from "../../components/Admin/Return/LoanInformation";

class ReturnComponents extends Component {
  state = {
    isLoading: false,
    searchQuery: '',
    context: null,
    calculations: {
      topPassed: false,
      bottomPassed: false,
      topVisible: false,
      bottomVisible: false,
    },
  };

  handleUpdate = (e, { calculations }) => this.setState({ calculations });

  handleContextRef = ref => this.setState({context: ref});

  constructor(props) {
    super(props);
    this.getLoanSearch = this.getLoanSearch.bind(this)
  }

  componentDidMount() {
    this.props.getPendingLoans();
  }

  getLoanSearch(data) {
    this.setState({isLoading: true});
    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = result => re.test(result.academic.code);
      let results = _.filter(this.props.pendingLoans, isMatch);
      this.setState({result: results, isLoading: false});
    }, 300)
  }

  render() {
    const { calculations } = this.state;
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
                    <Visibility offset={[10, 10]} onUpdate={this.handleUpdate}>
                      <Input loading={this.state.isLoading}
                             icon='users'
                             iconPosition='left'
                             placeholder='Buscar...'
                             onChange={_.debounce((event, data) => this.getLoanSearch(data), 500, {leading: true})}/>
                      <LoansReturn loansReturn={this.state.result !== undefined ?
                        this.state.result :
                        this.props.pendingLoans}
                      />
                    </Visibility>
                  </Grid.Column>
                  <Grid.Column className='column-return-components'>
                    <Rail className='my_rail' position='right'>
                      <Sticky context={this.state.context} pushing offset={20}>
                        {calculations.bottomVisible.toString()}
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
    pendingLoans: state.returnComponent.pendingLoans,
    endLoan: state.returnComponent.endLoan,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPendingLoans: () => {
      return dispatch(returnComponent.getPendingLoans());
    },
  };
};

ReturnComponents.propTypes = {
  pendingLoans: PropTypes.array,
  endLoan: PropTypes.bool,
  getPendingLoans: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnComponents)