import preact from 'preact';
import { connect } from 'preact-redux';

import { fetch_pictures } from '../Actions';


class Pagination extends preact.Component {
    change_page(event, page) {
        var value;
        if (this.props.type == 'username') {
            value = this.props.username;
        } else if (this.props.type == 'group') {
            value = this.props.group;
        }
        this.props.fetch_pictures(this.props.type, value, page);
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
    next(e) {
        if (this.props.page < this.props.pages) {
            this.change_page(e, this.props.type, this.props.page+1);
        }
    }
    prev(e) {
        if (this.props.page > 1) {
            this.change_page(e, this.props.type, this.props.page-1);
        }
    }
    separator() {
        return (
            <li><a class="inactive">...</a></li>
        );
    }
    render({page, pages, limit}) {
        var items = [];
        if (page > limit) {
            items.push(this.item(1));
            items.push(this.separator());
        }
        var start = page > limit ? page - limit : 1;
        var end;
        if (pages <= start + limit) {
            end = pages + 1;
        } else {
            end = start + limit;
        }
        for (var i = start; i<end; ++i) {
            items.push(this.item(i, i == page));
        }
        if (pages > start + limit) {
            items.push(this.separator());
            items.push(this.item(pages));
        }
        var start_attrs = page == 1 ? {'class' : "inactive"} : {};
        var end_attrs = page == pages ? {'class' : "inactive"} : {};
        var style = !pages ? {display: 'none'} : {};
        return (
            <div class="paginate" style={style}>
              <ul>
                <li>
                  <a href="#" {...start_attrs}
                     onClick={this.prev.bind(this)}>&lt;</a>
                </li>
                {items}
                <li>
                  <a href="#" {...end_attrs}
                     onClick={this.next.bind(this)}>&gt;</a>
                </li>
              </ul>
            </div>
        );
    }
}

const map_state_to_props = (state) => {
    return {
        username: state.username,
        group: state.group,
        type: state.type,
        page: state.page,
        pages: state.pages
    };
};

const map_dispatch_to_props = (dispatch) => {
    return {
        fetch_pictures: (type, value, page) => {
            dispatch(fetch_pictures(type, value, page));
        }
    }
};

export default connect(map_state_to_props, map_dispatch_to_props)(Pagination);
