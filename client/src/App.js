
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Cookies from 'js-cookie';
import {StreamChat} from 'stream-chat'
import { useState } from 'react';
import {Chat} from 'stream-chat-react'
import JoinGame from './components/JoinGame';

function App() {
  const api_key='qjw3n8m5aen7'
  const [isAuth,setIsAuth]=useState(false)
  
  const client=StreamChat.getInstance(api_key)
  const logOut=()=>{
    Cookies.remove('token')
    Cookies.remove('userId')
    Cookies.remove('username')
    Cookies.remove('firstName')
    Cookies.remove('lastName')
    Cookies.remove('hashedPassword')
    Cookies.remove('channelName')
    client.disconnectUser()
    setIsAuth(false)

  }

  //const cookies=new Cookies()
  const token=Cookies.get('token')
  const test=Cookies.get('test')
  //const test=Cookies.get('test')
  //const token2=Cookies.get('token22')
  if (token){
    client.connectUser(
      {
        id: Cookies.get('userId'),
        name:Cookies.get('username'),
        firstName:Cookies.get('firstName'),
        lastName:Cookies.get('lastName'),
        hashedPassword:Cookies.get('hashedPassword'),
      },token
    ).then((user)=>{setIsAuth(true)})
  }
  
  return (
    <div className="App">
      {isAuth ?
      (
      <Chat client={client}>
        <JoinGame />
        <button onClick={logOut}>Log Out</button>
      </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth}/> 
          <Login setIsAuth={setIsAuth}/>
        </>
        
      )}
      
      
    </div>
    
  );
}

export default App;
