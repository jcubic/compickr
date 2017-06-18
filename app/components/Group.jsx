import preact from 'preact';
import { connect } from 'preact-redux';

import { search_groups, fetch_pictures } from '../Actions';

const map_state_to_props = (state) => {
    return {
        group: state.group
    };
}

const map_dispatch_to_props = (dispatch) => {
    return {
        search_groups: (group) => {
            dispatch(search_groups(group));
        },
        change_group: (group, text) => {
            dispatch({
                type: 'CHANGE_GROUP',
                group: Object.assign({}, group, {
                    text: text
                })
            });
            dispatch(fetch_pictures('group', group, 1));
        }
    };
}

import { debounce } from '../utils';

class Group extends preact.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    search(value) {
        this.setState({
            open: true,
            value: value
        });
        this.search_groups(value);
    }
    search_groups = debounce((value) => {
        this.props.search_groups(value);
    }, 300);
    open() {
        this.setState({
            open: true
        });
    }
    change_group(group) {
        this.props.change_group(group, group.name);
        this.setState({
            open: false,
            value: group.name
        });
    }
    render({group}, state) {
        var sugestions = group.suggestions.map((group) => {
            return (
                <li onClick={() => this.change_group(group)}>
                  {group.name}
                </li>
            );
        });
        var style = {};
        if (!state.open) {
            style.display = 'none';
        }
        return (
            <div class="suggestions">
              <input value={this.state.value} onFocus={() => this.open()}
                     onInput={(e) => this.search(e.target.value)}/>
              <ul style={style}>
                {sugestions}
              </ul>
            </div>
        );
    }
}

export default connect(map_state_to_props, map_dispatch_to_props)(Group);
