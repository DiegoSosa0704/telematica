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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this)
  }

  handleButton() {
    this.props.onSubmit(this.props.access_token)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleButton}>boton</button>
        {this.props.isAdmin ? (
          <div>
            Es admin
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
        ) : (
          <div>
            No es admin
            <HomeMenu/>
            <Container style={{minHeight: '80vh'}}>
              <Switch>
                <Route exact path="/" component={Schedule}/>
                <Route exact path="/record" component={Record}/>
                <Route exact path="/recommended" component={Recommended}/>
                <Route exact path="/login" component={LoginAdmin}/>
                <Route exact path="/admin/home" component={AdminContainer}/>
                {/* <PrivateRoute path="/protected" component={Protected}/>*/}
              </Switch>
            </Container>
            <HomeFooter/>
          </div>
        )}

      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAdmin: state.auth.is_admin,
    access_token: state.auth.access.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (token) => {
      return dispatch(auth.is_admin(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
