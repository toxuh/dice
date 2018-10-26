import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';

class App extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired
    };

    render() {
        return (
            <div className="wrapper">
                Dice
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        isFetching
    } = state.app || {
        isFetching: false
    };

    return {
        isFetching
    };
};

export default connect(mapStateToProps)(App);
