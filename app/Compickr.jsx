import preact from 'preact';

import './style.css';
import Picture from './components/Picture';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import List from './components/List';
import TitleBar from './components/TitleBar';
import Grid from './components/Grid';
import Navigation from './components/Navigation';

class Compickr extends preact.Component {
    render(props, state) {
        return (
            <div class="container">
              <TitleBar/>
              <div class="list">
                <List />
                <Pagination limit={4}/>
                <Loader />
              </div>
              <div class="picture-wrapper">
                <Grid />
                <Picture />
                <Navigation />
              </div>
            </div>
        );
    }
}

export default Compickr;
