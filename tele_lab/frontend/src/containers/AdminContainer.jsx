import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import NotFound from "../components/NotFound";
import {Grid, Segment} from "semantic-ui-react";
import Loan from '../containers/Loan'


class AdminContainer extends Component {
    render() {
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
    }
}


export default AdminContainer