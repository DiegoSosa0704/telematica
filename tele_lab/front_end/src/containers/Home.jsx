import React, {Component} from 'react'
import {Container, Grid} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {auth} from "../actions";
import * as reducers from "../reducers";
import Loan from "./Admin/Loan";
import Schedule from "./Academic/Schedule";
import Record from "./Academic/Record";
import Recommended from "./Academic/Recommended";
import AdminMenu from "../components/Admin/AdminMenu";
import HomeMenu from "../components/Academic/HomeMenu";
import HomeFooter from "../components/Academic/Footer";
import NotFound from "./NotFound";
import routes from '../routes'


class HomePage extends Component {
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
                    <Route exact path={routes.home} component={NotFound}/>
                    <Route exact path={routes.admin_user.loans} component={Loan}/>
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
                <Route exact path={routes.home} component={Schedule}/>
                <Route exact path={routes.education_user.record} component={Record}/>
                <Route exact path={routes.education_user.recommended} component={Recommended}/>
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
