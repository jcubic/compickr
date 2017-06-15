import preact from 'preact';
import { connect } from 'preact-redux';

export function Loader({active}) {
    var attrs = {class: "cssload-container"};
    if (active) {
        attrs['class'] += " active";
    }
    return (
        <div {...attrs}>
          <div class="cssload-whirlpool"></div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        active: state.fetching
    };
};

export default connect(mapStateToProps)(Loader);
