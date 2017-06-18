import preact from 'preact';
import { connect } from 'preact-redux';

import Username from './Username';
import Type from './Type';
import Group from './Group';

function TitleBar({type}) {
    return (
        <div class="title-bar">
          <span class="name">Compickr</span>
          <Type/>
          {type == 'username' ? <Username/> : <Group/>}
        </div>
    );
}

const map_state_to_props = (state) => {
    return {
        type: state.type
    };
};

export default connect(map_state_to_props)(TitleBar);
