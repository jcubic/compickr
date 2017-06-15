import config from './config';
import 'whatwg-fetch';
import 'promise-polyfill';

import preact from 'preact';
import { createStore } from 'redux';
import { Provider } from 'preact-redux';

import './style.css';

function query(obj) {
    return Object.keys(obj).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

function fetch_pictures(username, page) {
    var username = username;
    var per_page = 12;
    var url = config.api + '?' + query({
        username,
        count: per_page,
        page: page
    });
    fetch(url).then((response) => {
        return response.json();
    }).then(({pictures, count}) => {
        hub.dispatch({
            type: 'PICTURES',
            pictures,
            pages: Math.ceil(count / per_page)
        });
    }).catch((ex) => {
        hub.dispatch({
            type: 'ERROR',
            error: ex
        });
    });
}


window.hub = createStore((
    state = {
        username: '',
        pictures: [],
        zoom: null,
        page: 1,
        pages: null
    },
    action
) => {
    switch(action.type) {
        case 'FETCH_PICTURES':
            fetch_pictures(action.username, action.page);
            return Object.assign({}, state, {
                fetching: true
            });
        case 'CHANGE_PAGE':
            if (state.username) {
                fetch_pictures(state.username, action.page);
            }
            return Object.assign({}, state, {
                page: action.page
            });
        case 'CHANGE_NAME':
            fetch_pictures(action.username, 1);
            return Object.assign({}, state, {
                username: action.username,
                page: 1
            });
        case 'PICTURES':
            return Object.assign({}, state, {
                pictures: action.pictures,
                pages: action.pages,
                fetching: false
            });
        case 'ZOOM_IN':
            return Object.assign({}, state, {
                zoom: Object.assign({}, state.pictures[action.index])
            });
        case 'ERROR':
            return Object.assign({}, state, {
                username: null,
                error: action.error
            });
        default:
            return state;
    }
});

class Username extends preact.Component {
    constructor() {
        super();
        this.keypress = this.keypress.bind(this);
    }
    keypress(e) {
        if (e.which == 13) {
            var username = this.input.value.trim();
            if (username) {
                hub.dispatch({
                    type: 'CHANGE_NAME',
                    username: username
                });
            }
        }
    }
    render() {
        return <input ref={(input) => { this.input = input; }}
                      onKeyPress={this.keypress} />
    }
}

class Thumb extends preact.Component {
    render(props, state) {
        return (
            <div>
              <img src={props.thumb} onClick={props.onClick}/>
            </div>
        )
    }
}

class Picture extends preact.Component {
    render(props, state) {
        var style = {};
        if (!props.src) {
            style.display = 'none';
        }
        return (
            <div class="preview">
              <img src={props.src} style={style}/>
            </div>
        );
    }
}

class Pagination extends preact.Component {
    changePage(event, page) {
        hub.dispatch({
            type: 'CHANGE_PAGE',
            page
        });
        event.preventDefault();
    }
    item(page, active) {
        var attrs = active ? {class: "active"} : {};
        return (
            <li>
              <a href="#" {...attrs} onClick={ (e) => this.changePage(e,page) }>
                { page }
              </a>
            </li>
        )
    }
    separator() {
        return (
            <li><a class="inactive">...</a></li>
        );
    }
    render(props, state) {
        var items = [];
        var limit = 5;
        if (props.page > limit) {
            items.push(this.item(1));
            items.push(this.separator());
        }
        var start = props.page > limit ? props.page - limit : 1;
        var end;
        if (props.pages <= start + limit) {
            end = props.pages + 1;
        } else {
            end = start + limit;
        }
        for (var i = start; i<end; ++i) {
            items.push(this.item(i, i == props.page));
        }
        if (props.pages > start + limit) {
            items.push(this.separator());
            items.push(this.item(props.pages));
        }
        var start_attrs = props.page == 1 ? {'class' : "inactive"} : {};
        var end_attrs = props.page == props.pages ? {'class' : "inactive"} : {};
        return (
            <div class="paginate">
              <ul>
                <li>
                  <a href="#" {...start_attrs}>&lt;</a>
                </li>
                {items}
                <li>
                  <a href="#" {...end_attrs}>&gt;</a>
                </li>
              </ul>
            </div>
        );
    }
}


class Compickr extends preact.Component {
    render(props, state) {
        var pictures = props.pictures.map((photo, index) => {
            return (
                <li>
                  <Thumb thumb={photo.thumb} onClick={
                      () => {
                          hub.dispatch({
                              type: 'ZOOM_IN',
                              index
                          });
                      }
                  }/>
                </li>
            );
        });
        return (
            <div>
              <Username/>
              <div>
                <ul class="thumbs">{pictures}</ul>
                <Pagination pages={props.pages} page={props.page}/>
              </div>
              <Picture src={props.zoom ? props.zoom.big : null}/>
            </div>
        );
    }
}
var main = document.getElementById('main');
function render() {
    var state = hub.getState();
    console.log(state);
    preact.render(
        <Compickr {...state}/>,
        main,
        main.lastChild
    );
}

render();
hub.subscribe(render);

