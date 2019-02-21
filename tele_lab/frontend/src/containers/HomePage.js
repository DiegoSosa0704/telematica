import React, {Component} from 'react'
import {Container} from "semantic-ui-react";
import {Redirect, Route, Switch} from "react-router-dom";
import Schedule from "./Schedule";
import Record from "./Record";
import Recommended from "./Recommended";
import LoginAdmin from "./LoginAdmin";
import AdminContainer from "./AdminContainer";
import HomeFooter from "../components/Footer";
import HomeMenu from "../components/HomeMenu";

export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

class HomePage extends Component {
    render() {
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
                        {/* <PrivateRoute path="/protected" component={Protected}/>*/}
                    </Switch>
                </Container>
                <HomeFooter/>
            </div>
        );
    }
}

export default HomePage