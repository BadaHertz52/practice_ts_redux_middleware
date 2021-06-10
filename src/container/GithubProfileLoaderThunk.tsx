import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GithubProfileInfo from '../components/GithubProfileInfo';
import GithubUsernameForm from '../components/GithubUsernameForm';
import { RootState } from '../modules';
import { getUserProfileThunk } from '../modules/github';


function GithubProfileLoaderThunk(){
  const {loading, data, error} =useSelector( (state :RootState) => state.github.userProfile) ;
  const dispatch = useDispatch();

  const onSubmitUsername = (username: string) =>{
    dispatch(getUserProfileThunk(username))
  } ;

  return (
    <>
    <div style={{display:'flex'}}>
      <h1 style={{marginLeft:'500px'}}>THUNK</h1>
      <GithubUsernameForm onSubmitUsername={onSubmitUsername}/>
    </div>
    
      {loading && <p style={ {textAlign: 'center'}}>로딩중...</p> }
      {data && (<GithubProfileInfo
        name={data.name} thumbnail={data.avatar_url} bio={data.bio} blog={data.blog}/>)}
      {error && <p style={ {textAlign: 'center'}}> 에러발생...</p> }
    </>    
    
  )
}
export default GithubProfileLoaderThunk;