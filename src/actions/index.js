import md5 from "react-native-md5";

import { FREE_CREDITS_AMOUNT } from '../constants';

export const generateNumber = () => {
    const number = Math.floor(Math.random() * 100);
    const hash = md5.hex_md5(number);

    return {
        type: 'GENERATE_NUMBER',
        number,
        hash
    };
};

export const useFreeCredits = () => {
    return {
        type: 'CHANGE_BALANCE',
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

export const setBet = (amount) => {
    return {
        type: 'SET_BET',
        data: amount
    };
};

export const changeBalance = (amount) => {
    return {
        type: 'CHANGE_BALANCE',
        data: Math.round(amount)
    };
};
