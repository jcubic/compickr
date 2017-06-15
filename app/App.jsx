import preact from 'preact';

import './style.css';
import Picture from './components/Picture';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import List from './components/List';
import Username from './components/Username';




function foo() {
    return (
        <div>
          <Router>
            <Home path="/"/>
            <List path="/pictures/:user"/>
            <Picture path="/picture/:id"/>
          </Router>
        </div>
    );
}



export default class App extends preact.Component {
    render(props, state) {
        return (
            <div>
              <div class="grid">
                <Username/>
                <div class="list">
                  <List />
                  <Pagination/>
                  <Loader/>
                </div>
                <Picture/>
              </div>
            </div>
        );
    }
}


