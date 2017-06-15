import preact from 'preact';
import { connect } from 'preact-redux';
import { fetch_pictures } from '../Actions';

class Username extends preact.Component {
    constructor() {
        super();
        this.keypress = this.keypress.bind(this);
    }
    keypress(e) {
        if (e.which == 13) {
            var username = e.target.value.trim();
            if (username) {
                this.props.change_user(username);
            }
        }
    }
    render() {
        return <input onKeyPress={this.keypress} />
    }
}

const map_dispatch_to_props = (dispatch) => {
    return {
        change_user: (username) => {
            dispatch(fetch_pictures(username, 1));
        }
    };
};

export default connect(null, map_dispatch_to_props)(Username);
