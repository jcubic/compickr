import 'whatwg-fetch';
import config from './config';
import { debounce } from '../utils';

function query(obj) {
    return Object.keys(obj).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

export function fetch_pictures(type, value, page) {
    return function(dispatch) {
        var per_page = 12;
        var url = config.api + '?' + query({
            [type]: value.id || value,
            count: per_page,
            page: page
        });
        dispatch({
            type: 'FETCH_PICTURES',
            key: type,
            value,
            page
        });
        fetch(url).then((response) => {
            return response.json();
        }).then(({pictures, count}) => {
            dispatch({
                type: 'PICTURES',
                pictures,
                pages: Math.ceil(count / per_page)
            });
        }).catch((ex) => {
            dispatch({
                type: 'ERROR',
                error: ex
            });
        });
    };
};

export function search_groups(text) {
    return function(dispatch) {
        var url = config.api + '?' + query({
            search: text
        });
        dispatch({
            type: 'GROUP_TEXT',
            text
        });
        fetch(url).then((response) => {
            return response.json();
        }).then((groups) => {
            dispatch({
                type: 'GROUPS',
                suggestions: groups
            });
        }).catch((ex) => {
            dispatch({
                type: 'ERROR',
                error: ex
            });
        });
    };
};
