import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';

import Balance from '../components/Balance';
import Dice from '../components/Dice';
import Result from '../components/Result';

import {
    useFreeCredits,
    setUserNumber,
    generateNumber,
    setBet,
    changeBalance
} from '../actions';

import './App.css';

class App extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        balance: PropTypes.number.isRequired,
        generatedNumber: PropTypes.number,
        generatedHash: PropTypes.string,
        userNumber: PropTypes.number,
        userBet: PropTypes.number,
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

    @bind
    onSetBet(amount) {
        const { dispatch } = this.props;

        dispatch(setBet(amount))
    }

    @bind
    onChangeBalance(amount) {
        const { dispatch } = this.props;

        dispatch(changeBalance(amount))
    }

    @bind
    onRegenerateNumber() {
        const { dispatch } = this.props;

        dispatch(generateNumber());
    }

    render() {
        const {
            balance,
            userNumber,
            userBet,
            descriptions,
            generatedHash,
            generatedNumber
        } = this.props;

        return (
            <div className="App">
                <Balance
                    userBalance={balance}
                    useFreeCredits={this.onUseFreeCredits}
                />
                <Dice
                    userBalance={balance}
                    userNumber={userNumber}
                    userBet={userBet}
                    descriptions={descriptions}
                    generatedNumber={generatedNumber}
                    setUserNumber={this.onSetUserNumber}
                    setUserBet={this.onSetBet}
                    changeBalance={this.onChangeBalance}
                    generateNumber={this.onRegenerateNumber}
                />
                {generatedHash && (
                    <div className="App__hash">Provably Fair Hash:<br/><b>{generatedHash}</b></div>
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
        userBet,
        descriptions
    } = state.app || {
        balance: 0,
        generatedNumber: null,
        generatedHash: '',
        userNumber: null,
        userBet: null,
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
        userBet,
        descriptions
    };
};

export default connect(mapStateToProps)(App);
