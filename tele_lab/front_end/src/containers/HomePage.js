import React, {Component} from 'react'
import {Container, Grid} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import Schedule from "./Schedule";
import Record from "./Record";
import Recommended from "./Recommended";
import LoginAdmin from "./LoginAdmin";
import AdminContainer from "./AdminContainer";
import HomeFooter from "../components/Footer";
import HomeMenu from "../components/HomeMenu";
import {connect} from "react-redux";
import NotFound from "../components/NotFound";
import Loan from "./Loan";
import AdminMenu from "../components/AdminMenu";
import {auth} from "../actions";
import * as reducers from "../reducers";


class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onSubmit(this.props.access_token)
  }

  render() {
    if (this.props.is_admin !== undefined) {
      if (this.props.is_admin) {
        return (
          <div>
            <AdminMenu/>
            <div style={{
              marginLeft: '250px',
              minWidth: '300px',
            }}>
              <Grid padded>
                <Grid.Column>
                  <Switch>
                    <Route exact path="/admin/home" component={NotFound}/>
                    <Route exact path="/admin/loans/" component={Loan}/>
                  </Switch>
                </Grid.Column>
              </Grid>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <HomeMenu/>
            <Container style={{minHeight: '80vh'}}>
              <Switch>
                <Route exact path="/" component={Schedule}/>
                <Route exact path="/record" component={Record}/>
                <Route exact path="/recommended" component={Recommended}/>
                <Route exact path="/login" component={LoginAdmin}/>
                <Route exact path="/admin/home" component={AdminContainer}/>
              </Switch>
            </Container>
            <HomeFooter/>
          </div>
        );
      }
    } else {
      return (
        <div>
          <h3>Cargando...</h3>
        </div>
      );
    }
  }
}


const mapStateToProps = state => {
  return {
    is_admin: state.auth.is_admin,
    access_token: state.auth.access.token,
    refresh_token: state.auth.refresh.token,
    isAuthenticated: reducers.isAuthenticated(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (token) => {
      return dispatch(auth.is_admin(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
