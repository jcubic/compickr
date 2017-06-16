export default (state, action) => {
    console.log(action);
    console.log(state);
    switch(action.type) {
        case 'CHANGE_GRID':
            var grid = state.grids[action.index];
            if (grid) {
                return Object.assign({}, state, {
                    grid: Object.assign(
                        {},
                        state.grid,
                        grid,
                        {index: action.index}
                    )
                });
            } else {
                return state;
            }
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
