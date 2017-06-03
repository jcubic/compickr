import preact from 'preact';
import config from './config';

class Compickr extends preact.Component {
    render() {
        return <h1>Hello</h1>
    }
}

preact.render(<Compickr/>, document.getElementById('main'));
