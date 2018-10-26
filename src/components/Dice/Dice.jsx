import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';

class Dice extends Component {
    static propTypes = {
        userBalance: PropTypes.number.isRequired,
        setUserNumber: PropTypes.func.isRequired,
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

    constructor(props) {
        super(props);

        this.state = {
            isUserNumber: false,
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

    render() {
        const { descriptions } = this.props;
        const isBettingAvailable = (this.props.userBalance > 0) && (this.props.userNumber);

        return (
            <div className="Dice">
                <div>
                    Bet amount:
                    <input
                        type="text"
                        placeholder="20"
                    />
                </div>
                <div>
                    Number:
                    <input
                        type="text"
                        placeholder="25"
                        onChange={this.inputNumber}
                    />
                </div>
                <div>
                    <button disabled={!isBettingAvailable}>Bet Hi</button>
                    <div hidden={!this.state.isUserNumber}>
                        <p>Number &gt;= {this.props.userNumber}</p>
                        <p>Chance {descriptions.betHi.chance}%</p>
                        <p>Payout {descriptions.betHi.payout}x</p>
                    </div>
                </div>
                <div>
                    <button disabled={!isBettingAvailable}>Bet Lo</button>
                    <div hidden={!this.state.isUserNumber}>
                        <p>Number &lt;= {this.props.userNumber}</p>
                        <p>Chance {descriptions.betLo.chance}%</p>
                        <p>Payout {descriptions.betLo.payout}x</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dice;
