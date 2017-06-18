import preact from 'preact';
import { connect } from 'preact-redux';

import Thumb from './Thumb';


function List({pictures, fetching}) {
    var pictures = pictures.map((photo, index) => {
        return (
            <li>
              <Thumb thumb={photo.thumb} onClick={()=>this.props.zoom(index)}/>
            </li>
        );
    });
    var style = fetching ? {visibility: 'hidden'} : {};
    return (
        fetching ?
        <ul class="thumbs clearfix"></ul>
        :
        <ul class="thumbs clearfix" style={ style }>{pictures}</ul>
    );
}

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        pictures: state.pictures
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        zoom: (index) => {
            dispatch({
                type: 'ZOOM_IN',
                index
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
