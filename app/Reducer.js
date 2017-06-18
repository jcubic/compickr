import { fetch_pictures } from './Actions';


export default (state, action) => {
    function group(object) {
        return Object.assign({}, state, {
            group: Object.assign({}, state.group, object)
        });
    }
    switch(action.type) {
        case 'CHANGE_GROUP':
            return group(action.group);
        case 'GROUP_TEXT':
            return group({
                text: action.text
            });
        case 'GROUPS':
            return group({
                suggestions: action.suggestions
            });
        case 'CHANGE_TYPE':
            return Object.assign({}, state, {
                type: action.value
            });
        case 'SET_DIMENSIONS':
            return Object.assign({}, state, {
                zoom: Object.assign({}, state.zoom, {
                    width: action.width,
                    height: action.height
                })
            });
        case 'CHANGE_GRID':
            var grid = state.grids[action.index];
            if (grid) {
                return Object.assign({}, state, {
                    grid: Object.assign(
                        {},
                        state.grid,
                        {path: null},
                        grid,
                        {index: action.index}
                    )
                });
            } else {
                return state;
            }
        case 'FETCH_PICTURES':
            var value;
            if (action.key == 'group') {
                value = Object.assign({}, state.group, action.value);
            } else {
                value = action.value;
            }
            return Object.assign({}, state, {
                [action.key]: value,
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
                error: action.error
            });
        default:
            return state;
    }
};
