import React, {Component} from 'react';
import {Image} from "semantic-ui-react";
import * as reducers from '../reducers'
import {auth} from '../actions'
import {connect} from 'react-redux'

class NotFound extends Component {
    state = {};

    handleItemClick = () => {
        //this.setState({activeItem: name});
        if (this.props.isAuthenticated) {
            console.log("Esta autenticado");
            this.props.logout();
        } else {
            console.log("pos no")
        }
    };

    render() {
        return (
            <div>
                <button onClick={this.handleItemClick}>
                    Logout
                </button>
                <h2>Not Found</h2>
                <p>The page you're looking for does not exists.</p>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'/>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: reducers.isAuthenticated(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            return dispatch({type: auth.LOGOUT_SUCCESSFUL});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)