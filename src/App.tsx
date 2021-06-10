import React from 'react';
import GithubProfileLoaderSaga from './container/GithubProfileLoaderSaga';
import GithubProfileLoaderThunk from './container/GithubProfileLoaderThunk';
import {Route , Link} from 'react-router-dom'; 

function App() {
  return (
    <div>
      <ul>
        <li><Link  to='/thunk' /*style={linkStyle}*/>React-Thunk</Link></li>
        <li><Link  to='/saga'>React-Saga</Link></li>
      </ul>
      <hr/>
      <Route path="/thunk" component={GithubProfileLoaderThunk} exact/>
      <Route path="/saga" component={GithubProfileLoaderSaga}/>
      
    </div>

  );
  }

export default App;
