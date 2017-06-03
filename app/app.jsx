import preact from 'preact';
import config from './config';
import 'whatwg-fetch';

class PubSub {
    constructor() {
        this.callbacks = {};
    }
    on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || [];
        this.callbacks[name].push(fn);
    }
    off(name, fn) {
        if (this.callbacks[name]) {
            if (typeof fn == 'undefined') {
                delete this.callbacks[name];
            } else {
                this.callbacks[name] = this.callbacks[name].filter((callback) => {
                    callback == fn;
                });
            }
        }
    }
    trigger(name, ...args) {
        if (this.callbacks[name]) {
            this.callbacks[name].forEach((fn) => fn(...args));
        }
    }
}


class FlickrPhotos {
    constructor() {
        this.events = new PubSub();
    }
    onUpdate(fn) {
        this.events.on('username', fn);
    }
    onError(fn) {
        this.events.on('error', fn);
    }
    setUser(username) {
        fetch(config.api + '?username=' + username).then((response) => {
            return response.json();
        }).then((photos) => {
            this.photos = photos;
            this.events.trigger('username', photos);
        }).catch((ex) => {
            this.events.trigger('error', ex);
        });
    }
}

var photos = new FlickrPhotos();

class Username extends preact.Component {
    constructor() {
        super();
        this.keypress = this.keypress.bind(this);
    }
    keypress(e) {
        if (e.which == 13) {
            var username = this.input.value.trim();
            if (username) {
                photos.setUser(username);
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
    constructor() {
        super();
        this.state.data = [];
    }
    componentDidMount() {
        photos.onUpdate((photos) => {
            this.setState({data: photos});
        });
    }
    render(props, state) {
        var pictures = state.data.map((photo, index) => {
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
preact.render(<Compickr/>, document.getElementById('main'));

