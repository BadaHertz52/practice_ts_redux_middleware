import React from 'react';
import GithubProfileLoaderSaga from './container/GithubProfileLoaderSaga';
import GithubProfileLoaderThunk from './container/GithubProfileLoaderThunk';
import {Route , Link} from 'react-router-dom'; 
import styled from 'styled-components';

function App() {
  const Button = styled.div`
    margin: 50px 5px;
    padding-left:25px;
    padding-bottom: 5px;
    width: 160px;
    font-size: 25px;
    background-color:#D4DFE6 ;
    
    font-weight:bolder;
    &:hover {
      background-color:#86a9d1 ;
    }
  `;
  return (
    <>
      <div style={{display:'flex', justifyContent:'center'}}>
        <Button><Link  to='/thunk'  style={{textDecoration:'none' , color:'#1d3658' }}>React-Thunk</Link></Button>
        <Button><Link  to='/saga'  style={{textDecoration:'none' ,color:'#1d3658'}}>React-Saga</Link></Button>
      </div>
      
      <Route path="/thunk" component={GithubProfileLoaderThunk}/>
      <Route path="/saga" component={GithubProfileLoaderSaga}/>
      
    </>

  );
  }

export default App;
