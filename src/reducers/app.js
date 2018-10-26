const defaultState = {
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

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'GENERATE_NUMBER': {
            return {
                ...state,
                generatedNumber: action.number,
                generatedHash: action.hash,
            };
        }
        case 'USE_FREE_CREDITS': {
            return {
                ...state,
                balance: action.data
            }
        }
        case 'SET_USER_DATA': {
            const { desc } = action;

            return {
                ...state,
                userNumber: action.number,
                descriptions: {
                    betHi: {
                        chance: desc.betHi.chance,
                        payout: desc.betHi.payout
                    },
                    betLo: {
                        chance: desc.betLo.chance,
                        payout: desc.betLo.payout
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
};
