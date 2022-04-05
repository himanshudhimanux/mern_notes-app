import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from "./components/Header";
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import MyNotes from './components/MyNotes';
import Register from './components/Register';
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
import UserProfile from './components/UserProfile';

function App() {

    const [search, setSearch] = useState("");

  return (
    
    <BrowserRouter>
    <Header setSearch={setSearch}/>
      <Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/createNote' element={<CreateNote/>} />
        <Route path='/note/:id' element={<UpdateNote/>} />
        <Route path='/profile' element={<UserProfile/>}></Route>
        <Route path='/mynotes' element={<MyNotes search={search} />}  />
     </Routes>
     <Footer/>
    </BrowserRouter>
     
  );
}

export default App;
