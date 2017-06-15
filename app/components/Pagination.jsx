import preact from 'preact';
import { connect } from 'preact-redux';

import { fetch_pictures } from '../Actions';

class Pagination extends preact.Component {
    change_page(event, page) {
        this.props.fetch_pictures(this.props.username, page);
        event.preventDefault();
    }
    item(page, active) {
        var attrs = active ? {class: "active"} : {};
        return (
            <li>
              <a href="#" {...attrs} onClick={(e)=>this.change_page(e,page)}>
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
    render(props) {
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

const map_state_to_props = (state) => {
    return {
        username: state.username,
        page: state.page,
        pages: state.pages
    };
};

const map_dispatch_to_props = (dispatch) => {
    return {
        fetch_pictures: (username, page) => {
            dispatch(fetch_pictures(username, page));
        }
    }
};

export default connect(map_state_to_props, map_dispatch_to_props)(Pagination);
