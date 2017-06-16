import 'promise-polyfill';
import preact from 'preact';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'preact-redux';
import { Router } from 'preact-router';
import thunk from 'redux-thunk';

import Compickr from './Compickr';
import reducer from './Reducer';

import { grids } from './components/Grid';

var grid = Object.assign({}, grids[0]);
grid.count = grids.length;
grid.index = 0;

window.hub = createStore(reducer, {
    username: '',
    pictures: [],
    zoom: null,
    page: 1,
    pages: null,
    grids: grids,
    grid: grid
}, applyMiddleware(thunk));

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
