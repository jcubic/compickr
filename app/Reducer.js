export default (state, action) => {
    switch(action.type) {
        case 'FETCH_PICTURES':
            return Object.assign({}, state, {
                username: action.username,
                page: action.page,
                fetching: true
            });
        case 'PICTURES':
            return Object.assign({}, state, {
                pictures: action.pictures,
                pages: action.pages,
                fetching: false
            });
        case 'ZOOM_IN':
            return Object.assign({}, state, {
                zoom: Object.assign({}, state.pictures[action.index])
            });
        case 'ERROR':
            return Object.assign({}, state, {
                username: null,
                error: action.error
            });
        default:
            return state;
    }
};
