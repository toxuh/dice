import sha256 from 'sha256';

import { FREE_CREDITS_AMOUNT } from '../constants';

export const generateNumber = () => {
    const number = Math.floor(Math.random() * 100);
    const hash = sha256(number);

    return {
        type: 'GENERATE_NUMBER',
        number,
        hash
    };
};

export const useFreeCredits = () => {
    return {
        type: 'USE_FREE_CREDITS',
        data: FREE_CREDITS_AMOUNT
    };
};

export const setUserNumber = (number) => {
    const desc = {
        betHi: {
            chance: 100 - number,
            payout: Math.round((100 / (100 - number)) * 100) / 100 // Округление до сотых
        },
        betLo: {
            chance: number,
            payout: Math.round((100 / number) * 100) / 100 // Округление до сотых
        }
    };

    return {
        type: 'SET_USER_DATA',
        number,
        desc
    };
};
