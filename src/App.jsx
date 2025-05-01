import React, { useState } from 'react';
import Userprofile from './pages/Userprofile';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appnavbar from './Appnavbar';
import Frontpage from './pages/Frontpage';
import UserContactUs from './pages/UserContact';
import Home from './pages/Home';
import UserBuysell from './pages/UserBuyrent';
import Userorder from './pages/Userorder';
import UserRepair from './pages/UserRepair'
import UserRepairOrder from './pages/UserRepairOrder';
import SPSell from './pages/SPSell';
import SPLogin from './pages/SPLogin';
import SPsignup from './pages/SPsignup';
import SPprofile from './pages/SPprofile';
import SPorder from './pages/SPorder';
import SPsupport from './pages/SPsupport';
import SPDashboard from './pages/SPDashboard';
import SPServiceRequest from './pages/SPServiceRequest';
import Repairshoplogin from './pages/Repairshoplogin';
import RepairshopSignUp from './pages/Repairshopsignup';
import RSsupport from './pages/RSsupport';
import RSProfile from './pages/RSProfile';
import RSOrder from './pages/RSOrder';
import RSRequest from './pages/RSRequest';
import PrivateRoute from '../Privateroute';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState( localStorage.getItem("accessToken") ? true : false);
    const handleLogin = () => {
        setIsAuthenticated(true);
    };
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");  
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
    }
    return (
        <div >
            <BrowserRouter>
                <Appnavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
                <Routes>
                    <Route path='/' element={<PrivateRoute />}>
                    <Route path='/User/home' Component={Home}></Route>
                    <Route path='/User/Contactus' Component={UserContactUs}></Route>
                    <Route path='/User/profile' Component={Userprofile}></Route>
                    <Route path='/User/buy-rent' Component={UserBuysell}></Route>
                    <Route path='/User/Order' Component={Userorder}></Route>
                    <Route path='/User/repair' Component={UserRepair}></Route>
                    <Route path='/User/repairorder' Component={UserRepairOrder}></Route>
                    <Route path='/SP/Sell-rent' Component={SPSell}></Route>
                    <Route path='/SP/profile' Component={SPprofile}></Route>
                    <Route path='/SP/orders' Component={SPorder}></Route>
                    <Route path='/SP/support' Component={SPsupport}></Route>
                    <Route path='/SP/Dashboard' Component={SPDashboard}></Route>                   
                    <Route path='/SP/requests' Component={SPServiceRequest}></Route>
                    <Route path='/Repairshop/support' Component={RSsupport}></Route>
                    <Route path='/Repairshop/profile' Component={RSProfile}></Route>
                    <Route path='/Repairshop/orders' Component={RSOrder}></Route>
                    <Route path='/Repairshop/requests' Component={RSRequest}></Route>
                    </Route>
                    <Route path='/Homepage'Component={Frontpage}></Route>
                    <Route path='/User/Login' element={<UserLogin handleLoginfromApp={handleLogin}/>}></Route>
                    <Route path='/User/Signup' Component={UserSignup}></Route>
                    <Route path='/SP/Login' element={<SPLogin handleLoginfromApp={handleLogin}/>}></Route>
                    <Route path='/SP/signup' Component={SPsignup}></Route>
                    <Route path='/Repairshop/Login' element={<Repairshoplogin handleLoginfromApp={handleLogin}/>}></Route>
                    <Route path='/Repairshop/signup' Component={RepairshopSignUp}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
