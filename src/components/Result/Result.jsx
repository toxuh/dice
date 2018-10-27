import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Result.css';

class Result extends Component {
    static propTypes = {
        number: PropTypes.number,
        type: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ])
    };

    render() {
        const {
            number,
            type
        } = this.props;

        return (
            <div className="Result" hidden={!type}>
                Result
                <p className="Result__text">{number} {type}</p>
            </div>
        );
    }
}

export default Result;
