import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes , Route, BrowserRouter, useNavigate} from "react-router-dom"
import './index.css';
import Example from './react-code/Example';
import Login from './react-code/Login';
import './App.css';
import Logout from './react-code/Logout';

const App = () => {

  // 認証確認メソッド
  // → 認証されていない場合、ログインページにリダイレクト
  const RequireAuth = ( props ) => {
    const myAuthority = sessionStorage.getItem('accountid');
    // 権限が「GENERAL」の場合、渡されたコンポーネントをレンダリング
    if(myAuthority !== null){
      return props.component;
    }
    // 権限がない場合、ログインページへリダイレクト
    document.location = "/login";
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth component={<Example />} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
