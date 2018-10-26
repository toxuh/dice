const defaultState = {
    isFetching: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'START_FETCHING': {
            return {
                ...state,
                isFetching: true
            };
        }
        default: {
            return state;
        }
    }
};
