import config from './config';
import 'whatwg-fetch';
import 'babel-polyfill';

import preact from 'preact';
import { createStore } from 'redux';
import { Provider } from 'preact-redux';

var hub = createStore((state = {username: '', photos:[]}, action) => {
    switch(action.type) {
        case 'CHANGE_NAME':
            var username = action.value;
            fetch(config.api + '?username=' + username).then((response) => {
                return response.json();
            }).then((photos) => {
                hub.dispatch({
                    type: 'PHOTOS',
                    value: photos
                });
            }).catch((ex) => {
                hub.dispatch({
                    type: 'ERROR',
                    value: ex
                });
            });
            return Object.assign({}, state, {
                fetching: true
            });
        case 'PHOTOS':
            return Object.assign({}, state, {
                photos: action.value
            });
        case 'ERROR':
            return Object.assign({}, state, {
                error: action.value
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
                    value: username
                });
            }
        }
    }
    render() {
        return <input ref={(input) => { this.input = input; }}
                      onKeyPress={this.keypress} />
    }
}

class Picture extends preact.Component {
    render(props, state) {
        return (
            <div>
                <img src={props.thumb}/>
            </div>
        )
    }
}


class Compickr extends preact.Component {
    render(props, state) {
        var pictures = props.photos.map((photo, index) => {
            return <li><Picture thumb={photo.thumb}/></li>
        });
        return (
            <div>
            <Username/>
            <ul>{pictures}</ul>
            </div>
        )
    }
}
var main = document.getElementById('main');
function render() {
    preact.render(
        <Compickr photos={hub.getState().photos}/>,
        main,
        main.lastChild
    );
}

render();
hub.subscribe(render);

