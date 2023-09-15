import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import Login from './Login';
import Home from './Home'
import Notifications from './Notifications';
import Lobby from './lobby';

import LoginPage from './LoginPage';

//import Playground from './playground';
import Settings from './Settings';

import Profile from './profile'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NotFound from './NotFound';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    

    <Router>

    {/*<DndProvider backend={HTML5Backend}>
      <Home/>
    </DndProvider>*/}

    <Routes>
      
      <Route exact path = '/todo' element = {localStorage.getItem("items") ? <Home /> : <LoginPage />} />
      {/*<Route exact path = '/profile' element = {localStorage.getItem("items") ? <Playground /> : <LoginPage />} /> */}
      <Route exact path = '/notifications' element = {localStorage.getItem("items") ? <Notifications /> : <LoginPage/>} />
      <Route exact path = '/home' element = {localStorage.getItem("items") ? <Lobby /> : <LoginPage/>} />
      <Route exact path = '/login' element = {<LoginPage />} />
      <Route exact path = '/settings' element = {localStorage.getItem("items") ? <Settings /> : <LoginPage/>} />  
      <Route exact path = '/profile' element = {localStorage.getItem("items") ? <Profile /> : <LoginPage/>} />  

      <Route exact path = '/notfound' element = {<NotFound/>} />


      <Route path='*' element = {<NotFound/>} />

    </Routes>
  </Router>



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
