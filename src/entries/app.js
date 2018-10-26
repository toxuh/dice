import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';

import initStore from '../reducers';
import App from "../screens/App";

const store = initStore();

render(
    <Provider store={store}>
        <App />
    </Provider>, document.querySelector("#app"));
