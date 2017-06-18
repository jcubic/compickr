import preact from 'preact';
import { connect } from 'preact-redux';


class Type extends preact.Component {
    change_type(value) {
        this.props.change_type(value, this.props[value], this.props.page);
    }
    render() {
        return (
            <select onChange={(e) => this.change_type(e.target.value) }>
              <option value="username">username</option>
              <option value="group">group</option>
            </select>
        );
    }
}

const map_state_to_props = (state) => {
    return {
        username: state.username,
        group: state.group.id,
        page: state.page
    };
}

const map_dispatch_to_props = (dispatch) => {
    return {
        change_type: (type, value, page) => {
            dispatch({
                type: 'CHANGE_TYPE',
                value: type
            });
            if (value) {
                dispatch(fetch_pictures(type, value, page));
            }
        }
    }
};

export default connect(map_state_to_props, map_dispatch_to_props)(Type);
