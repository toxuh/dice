import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';

import Balance from '../components/Balance';
import Dice from '../components/Dice';

import {
    useFreeCredits,
    setUserNumber,
    generateNumber
} from '../actions';

class App extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        balance: PropTypes.number.isRequired,
        generatedNumber: PropTypes.number,
        generatedHash: PropTypes.string,
        userNumber: PropTypes.number,
        descriptions: PropTypes.shape({
            betHi: PropTypes.shape({
                chance: PropTypes.number,
                payout: PropTypes.number
            }),
            betLo: PropTypes.shape({
                chance: PropTypes.number,
                payout: PropTypes.number
            })
        })
    };

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(generateNumber());
    }

    @bind
    onUseFreeCredits() {
        const { dispatch } = this.props;

        dispatch(useFreeCredits());
    }

    @bind
    onSetUserNumber(number) {
        const { dispatch } = this.props;

        dispatch(setUserNumber(number));
    }

    render() {
        const {
            balance,
            userNumber,
            descriptions,
            generatedHash
        } = this.props;

        return (
            <div className="wrapper">
                <Balance
                    userBalance={balance}
                    useFreeCredits={this.onUseFreeCredits}
                />
                <Dice
                    userBalance={balance}
                    userNumber={userNumber}
                    descriptions={descriptions}
                    setUserNumber={this.onSetUserNumber}
                />
                {generatedHash && (
                    <p>Generated number hash: {generatedHash}</p>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        balance,
        generatedNumber,
        generatedHash,
        userNumber,
        descriptions
    } = state.app || {
        balance: 0,
        generatedNumber: null,
        generatedHash: '',
        userNumber: null,
        descriptions: {
            betHi: {
                chance: null,
                payout: null
            },
            betLo: {
                chance: null,
                payout: null
            }
        }
    };

    return {
        balance,
        generatedNumber,
        generatedHash,
        userNumber,
        descriptions
    };
};

export default connect(mapStateToProps)(App);
