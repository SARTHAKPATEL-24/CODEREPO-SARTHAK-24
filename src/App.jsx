import React, { useState } from 'react';
import Userprofile from './pages/Userprofile';
import Signup from './pages/Signup';
import Login3 from './pages/Login3';
import Login from './pages/Login';
import Login2 from './Login2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appnavbar from './Appnavbar';
import Forgotpass from './pages/Forgotpass';
import ContactUs from './pages/Contact';
import Aboutus from './pages/Aboutus';
import Frontpage from './pages/Frontpage';
import Home from './pages/Home';
import Services from './pages/Services';
import Rentabike from './pages/Rentabike';
import Buysell from './pages/Buysell';
import Buysell2 from './pages/Buysell2';
import Buysell33 from './pages/Buysell33';
import Buysell44 from "./pages/Buysell44";
function App() {
    return (
        <div >
            <BrowserRouter>
            <Appnavbar />
            <Routes>
                
                <Route path='/login3' Component={Login3}></Route>
                <Route path='/Signup' Component={Signup}></Route>
                <Route path='/Forgotpass' Component={Forgotpass}></Route>
                <Route path='/Contactus' Component={ContactUs}></Route>
                <Route path='/Frontpage' Component={Frontpage}></Route>
                <Route path='/Aboutus' Component={Aboutus}></Route>
                <Route path='/userprofile' Component={Userprofile}></Route>
                <Route path='/home' Component={Home}></Route>
                <Route path='/services' Component={Services}></Route>
                <Route path='/buy-sell' Component={Buysell}></Route>
                <Route path='/rent' Component={Rentabike}></Route>
                <Route path='/buy-sell2' Component={Buysell2}></Route>
                <Route path='/buy-sell33' Component={Buysell33}></Route>
                <Route path='/buy-sell44' Component={Buysell44}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
