import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';

import './Balance.css';

class Balance extends Component {
    static propTypes = {
        userBalance: PropTypes.number.isRequired,
        useFreeCredits: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            freeCreditsAvailable: true
        };
    }

    @bind
    addCredits() {
        this.props.useFreeCredits();

        this.setState({
            freeCreditsAvailable: false
        });
    }

    render() {
        return (
            <div className="Balance">
                <p className="Balance__amount">Balance: <b>{ this.props.userBalance }</b> credits</p>
                <button
                    type="button"
                    onClick={this.addCredits}
                    disabled={!this.state.freeCreditsAvailable}
                >Free credits</button>
            </div>
        );
    }
}

export default Balance;
