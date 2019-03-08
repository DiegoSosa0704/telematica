import React, {Component} from 'react'
import {Container} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import Schedule from "./Schedule";
import Record from "./Record";
import Recommended from "./Recommended";
import LoginAdmin from "./LoginAdmin";
import AdminContainer from "./AdminContainer";
import HomeFooter from "../components/Footer";
import HomeMenu from "../components/HomeMenu";
import {connect} from "react-redux";

class HomePage extends Component {
    render() {
        return (
            <div>
                {this.props.isAdmin ? (
                   <div>Es admin</div>
                ) : (
                    <div>No es admin</div>
                )}
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
