import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';

import Result from '../Result';

import './Dice.css';

class Dice extends Component {
    static propTypes = {
        userBalance: PropTypes.number.isRequired,
        setUserNumber: PropTypes.func.isRequired,
        setUserBet: PropTypes.func.isRequired,
        changeBalance: PropTypes.func.isRequired,
        generateNumber: PropTypes.func.isRequired,
        generatedNumber: PropTypes.number,
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

    constructor(props) {
        super(props);

        this.state = {
            isUserNumber: false,
            isUserBet: false,
            result: false
        };
    }

    @bind
    addCredits() {
        this.props.useFreeCredits();

        this.setState({
            freeCreditsAvailable: false
        });
    }

    @bind
    inputNumber(e) {
        const { value } = e.target;

        if (value.length && value >= 0 && value <= 100) {
            this.props.setUserNumber(parseInt(value));

            this.setState({
                isUserNumber: true
            })
        } else {
            this.setState({
                isUserNumber: false
            })
        }
    }

    @bind
    setBet(e) {
        const { value } = e.target;

        if (value.length && value > 0 && value <= this.props.userBalance) {
            this.props.setUserBet(parseInt(value));

            this.setState({
                isUserBet: true
            });
        } else {
            this.setState({
                isUserBet: false
            })
        }
    }

    handleClick(type) {
        const {
            userBalance,
            userNumber,
            generatedNumber,
            userBet,
            descriptions,
            changeBalance,
            generateNumber
        } = this.props;
        const { state } = this;

        switch (type) {
            case 'hi': {
                const { payout } = descriptions.betHi;

                if (userNumber <= generatedNumber) {
                    const amount = userBalance + userBet * payout;

                    changeBalance(amount);

                    this.setState({
                        ...state,
                        result: 'win'
                    });
                } else {
                    const amount = userBalance - userBet * payout;

                    changeBalance(amount);

                    this.setState({
                        ...state,
                        result: 'lose'
                    });
                }

                break;
            }
            case 'lo': {
                const { payout } = descriptions.betLo;

                if (userNumber >= generatedNumber) {
                    const amount = userBalance + userBet * payout;

                    changeBalance(amount);

                    this.setState({
                        ...state,
                        result: 'win'
                    });
                } else {
                    const amount = userBalance - userBet * payout;

                    changeBalance(amount);

                    this.setState({
                        ...state,
                        result: 'lose'
                    });
                }

                break;
            }
            default: {
                break;
            }
        }

        generateNumber();
    }

    render() {
        const {
            descriptions,
            userBalance,
            userNumber,
            userBet,
            generatedNumber
        } = this.props;
        const isButtonAvailable = (userBalance > 0) && userNumber && userBet && (userBet <= userBalance);
        const isFieldsAvailable = userBalance > 0;

        return (
            <div className="Dice">
                <div className="Dice__holder">
                    <label className="Dice__label">Bet amount:</label>
                    <input
                        type="text"
                        className="Dice__input"
                        placeholder="20"
                        onChange={this.setBet}
                        disabled={!isFieldsAvailable}
                    />
                </div>
                <div className="Dice__holder">
                    <label className="Dice__label">Number:</label>
                    <input
                        type="text"
                        className="Dice__input"
                        placeholder="25"
                        onChange={this.inputNumber}
                        disabled={!isFieldsAvailable}
                    />
                </div>
                <div className="Dice__play">
                    <div className="Dice__bet">
                        <button
                            className="Dice__button"
                            disabled={!isButtonAvailable}
                            onClick={() => {this.handleClick('hi')}}
                        >Bet Hi</button>
                        <div className="Dice__statistics" hidden={!this.state.isUserNumber}>
                            <p>Number &gt;= {this.props.userNumber}</p>
                            <p>Chance: {descriptions.betHi.chance}%</p>
                            <p>Payout: {descriptions.betHi.payout}x</p>
                        </div>
                    </div>
                    <div className="Dice__bet">
                        <button
                            className="Dice__button"
                            disabled={!isButtonAvailable}
                            onClick={() => {this.handleClick('lo')}}
                        >Bet Lo</button>
                        <div className="Dice__statistics" hidden={!this.state.isUserNumber}>
                            <p>Number &lt;= {this.props.userNumber}</p>
                            <p>Chance: {descriptions.betLo.chance}%</p>
                            <p>Payout: {descriptions.betLo.payout}x</p>
                        </div>
                    </div>
                </div>
                <Result
                    number={generatedNumber}
                    type={this.state.result}
                />
            </div>
        );
    }
}

export default Dice;
