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

class HomePage extends Component {
    render() {
        return (
            <div>
                {this.props.isAdmin ? (
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
                ) : (
                    <div>
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
        isAdmin: state.auth.is_admin
    }
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
