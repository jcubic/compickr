import 'promise-polyfill';
import preact from 'preact';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'preact-redux';
import { Router } from 'preact-router';
import thunk from 'redux-thunk';

import Compickr from './Compickr';
import reducer from './Reducer';

import { grids } from './components/Grid';

var grid = Object.assign({}, grids[0]);
grid.count = grids.length;
grid.index = 0;

const init_state = {
    username: '',
    pictures: [],
    zoom: null,
    page: 1,
    pages: null,
    grids: grids,
    grid: grid,
    type: 'username',
    group: {suggestions: []}
};

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

window.hub = createStore(
    reducer,
    init_state,
    composeEnhancers(applyMiddleware(thunk))
);

var main = document.getElementById('main');
preact.render(
    <div>
      <Provider store={hub}>
        <Compickr/>
      </Provider>
    </div>,
    main,
    main.lastChild
);
