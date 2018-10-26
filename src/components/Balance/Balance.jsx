import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';

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
                Balance: { this.props.userBalance } credits
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
