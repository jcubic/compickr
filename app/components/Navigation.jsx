import preact from 'preact';
import { connect } from 'preact-redux';

class Navigation extends preact.Component {
    next(event) {
        var grid = this.props.grid;
        if (grid.index < grid.count) {
            this.props.change_grid(grid.index + 1);
        }
        event.preventDefault();
    }
    prev(event) {
        var grid = this.props.grid;
        if (grid.index > 0) {
            this.props.change_grid(grid.index - 1);
        }
        event.preventDefault();
    }
    render({grid}) {
        var inactive = {class: 'inactive'};
        var prev_attrs = grid.index <= 0 ? inactive : {};
        var next_attrs = grid.index >= grid.count-1 ? inactive : {};
        return (
            <div class="paginate">
              <ul>
                <li>
                  <a href="#" {...prev_attrs} onClick={this.prev.bind(this)}>&lt;</a>
                </li>
                <li>
                  <a class="inactive">{grid.name}</a>
                </li>
                <li>
                  <a href="#" {...next_attrs} onClick={this.next.bind(this)}>&gt;</a>
                </li>
              </ul>
            </div>
        );
    }
}

const map_state_to_props = (state) => {
    return {
        grid: state.grid
    };
};

const map_dispatch_to_props = (dispatch) => {
    return {
        change_grid: (index) => {
            dispatch({
                type: 'CHANGE_GRID',
                index: index
            });
        }
    }
};

export default connect(map_state_to_props, map_dispatch_to_props)(Navigation);
