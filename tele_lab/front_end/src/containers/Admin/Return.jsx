import React, {Component} from 'react'
import {Divider, Grid, Header, Input, Segment} from "semantic-ui-react";
import LoansReturn from "../../components/Admin/Return/LoansReturn";
import ComponentsReturn from "../../components/Admin/Return/ComponentsReturn";
import _ from "lodash";
import {connect} from "react-redux";
import {returnComponent} from "../../actions";

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
            <Grid padded relaxed='very' stackable className='grid-return'>
              <Grid.Row>
                <Grid.Column>
                  <Header as='h3' content='Usuario'/>
                  <Input loading={this.state.isLoading}
                         icon='users'
                         iconPosition='left'
                         placeholder='Buscar...'
                         onChange={_.debounce((event, data) => this.getLoanSearch(data), 500, {leading: true})}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} className='row-return-components'>
                <Divider vertical/>
                <Grid.Column className='column-return-loans'>
                  <LoansReturn
                    loansReturn={this.state.result !== undefined ? this.state.result : this.props.pendingLoans}/>
                </Grid.Column>
                <Grid.Column className='column-return-components'>
                  <ComponentsReturn/>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPendingLoans: () => {
      return dispatch(returnComponent.getPendingLoans());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnComponents)