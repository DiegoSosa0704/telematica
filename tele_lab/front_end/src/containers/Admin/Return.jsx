import React, {Component} from 'react'
import {Grid, Header, Input, Segment, SegmentGroup} from "semantic-ui-react";
import LoansReturn from "../../components/Admin/Return/LoansReturn";
import ComponentsReturn from "../../components/Admin/Return/ComponentsReturn";
import _ from "lodash";
import {connect} from "react-redux";
import {returnComponent} from "../../actions";
import ModalEndLoan from "../../components/Admin/Return/ModalEndLoan";
import * as PropTypes from 'prop-types'
import DataUserLoan from "../../components/Admin/LoanTableUser";

class ReturnComponents extends Component {
  state = {isLoading: false};

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
    return (
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
                  <Input loading={this.state.isLoading}
                         icon='users'
                         iconPosition='left'
                         placeholder='Buscar...'
                         onChange={_.debounce((event, data) => this.getLoanSearch(data), 500, {leading: true})}/>
                  <LoansReturn loansReturn={this.state.result !== undefined ?
                    this.state.result :
                    this.props.pendingLoans}
                  />
                </Grid.Column>
                <Grid.Column className='column-return-components'>
                  <SegmentGroup stacked>
                    <Segment padded>
                      <Header as='h3' dividing>Usuario</Header>
                      {/*<DataUserLoan userLoan={}/>*/}
                    </Segment>
                    <Segment padded>
                      <ComponentsReturn/>
                    </Segment>
                  </SegmentGroup>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
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