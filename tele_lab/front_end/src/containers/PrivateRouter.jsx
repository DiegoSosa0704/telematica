import React from 'react'
import {Route, Redirect} from 'react-router'
import {connect} from 'react-redux'
import * as reducers from '../reducers'
import routes from "../routes";
import * as PropTypes from "prop-types";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated
      ? (
        <Component {...props}/>
      )
      : (
        <Redirect to={{
          pathname: routes.login,
        }}/>
      )
  )}/>
);

const mapStateToProps = (state) => ({
  isAuthenticated: reducers.isAuthenticated(state)
});

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, null)(PrivateRoute);