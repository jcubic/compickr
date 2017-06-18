import preact from 'preact';
import { connect } from 'preact-redux';

class Picture extends preact.Component {
    onLoad(e) {
        this.props.set_dimentions(e.target.width, e.target.height);
    }
    render({big, width = 500, height = 500}) {
        var style = {};
        if (!big) {
            style.display = 'none';
        }
        style.width = width + 'px';
        style.height = height + 'px'
        return (
            <div class="preview" style={style}>
              <img src={big} onLoad={this.onLoad.bind(this)}/>
            </div>
        );
    }
}

const map_state_to_props = (state) => {
    return state.zoom || {};
};

const map_dispatch_to_props = (dispath) => {
    return {
        set_dimentions: (width, height) => {
            dispath({
                type:'SET_DIMENSIONS',
                width: width,
                height: height
            });
        }
    };
};

export default connect(map_state_to_props, map_dispatch_to_props)(Picture);
