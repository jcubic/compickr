import 'promise-polyfill';

import preact from 'preact';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'preact-redux';
import { Router } from 'preact-router';
import thunk from 'redux-thunk';

import './style.css';

import reducer from './Reducer';


window.hub = createStore(reducer, {
    username: '',
    pictures: [],
    zoom: null,
    page: 1,
    pages: null
}, applyMiddleware(thunk));



function foo() {
    return (
        <div>
          <Router>
            <Home path="/"/>
            <List path="/pictures/:user"/>
            <Picture path="/picture/:id"/>
          </Router>
        </div>
    );
}

import Picture from './components/Picture';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import List from './components/List';
import Username from './components/Username';

class Compickr extends preact.Component {
    render(props, state) {
        return (
            <div>
              <div class="grid">
                <Username/>
                <div class="list">
                  <List />
                  <Pagination/>
                  <Loader/>
                </div>
                <Picture/>
              </div>
            </div>
        );
    }
}

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
