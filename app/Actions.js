import 'whatwg-fetch';
import config from './config';

function query(obj) {
    return Object.keys(obj).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

export function fetch_pictures(username, page) {
    return function(dispatch) {
        var per_page = 12;
        var url = config.api + '?' + query({
            username,
            count: per_page,
            page: page
        });
        dispatch({
            type: 'FETCH_PICTURES',
            username,
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
