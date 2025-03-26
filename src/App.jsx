import React, { useState } from 'react';
import Userprofile from './pages/Userprofile';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appnavbar from './Appnavbar';
import UserForgotpass from './pages/UserForgotpass';
import UserContactUs from './pages/UserContact';
import Frontpage from './pages/Frontpage';
import Home from './pages/Home';
import UserAboutus from './pages/UserAboutus';
import UserBuysell from './pages/UserBuyrent';
import Userorder from './pages/Userorder';
import UserRepair from './pages/UserRepair'
import SPSell from './pages/SPSell';
import SPLogin from './pages/SPLogin';
import SPsignup from './pages/SPsignup';
import SPprofile from './pages/SPprofile';
import SPForgotpass from './pages/SPForgotpass';
import Userpayment from './pages/Userpayment';
import SPorder from './pages/SPorder';
import SPsupport from './pages/SPsupport';
function App() {
    return (
        <div >
            <BrowserRouter>
            <Appnavbar />
            <Routes>
                <Route path='/home' Component={Home}></Route>
                <Route path='/User/login' Component={UserLogin}></Route>
                <Route path='/User/Signup' Component={UserSignup}></Route>
                <Route path='/User/Forgotpass' Component={UserForgotpass}></Route>
                <Route path='/User/Contactus' Component={UserContactUs}></Route>
                <Route path='/User/Frontpage' Component={Frontpage}></Route>
                <Route path='/user/profile' Component={Userprofile}></Route>
                <Route path='/User/AboutUs' Component={UserAboutus}></Route>
                <Route path='/User/buy-rent' Component={UserBuysell}></Route>
                <Route path='/User/Order' Component={Userorder}></Route>
                <Route path='/user/payment' Component={Userpayment}></Route>
                <Route path='/User/repair' Component={UserRepair}></Route>
                <Route path='/SP/Sell-rent' Component={SPSell}></Route>
                <Route path='/SP/Login' Component={SPLogin}></Route>
                <Route path='/SP/signup' Component={SPsignup}></Route>
                <Route path='/SP/profile' Component={SPprofile}></Route>
                <Route path='/SP/Forgotpass' Component={SPForgotpass}></Route>
                <Route path='/SP/orders' Component={SPorder}></Route>
                <Route path='/SP/support' Component={SPsupport}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
