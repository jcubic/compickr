import preact from 'preact';
import { connect } from 'preact-redux';

class Picture extends preact.Component {
    render(props, state) {
        var style = {};
        if (!props.src) {
            style.display = 'none';
        }
        return (
            <div class="preview">
              <img src={props.src} style={style}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {src: state.zoom ? state.zoom.big : null};
};

export default connect(mapStateToProps)(Picture);
