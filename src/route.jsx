import React,{ useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
function App() {
    return(
         <BrowserRouter>
         <Routes>
            <Route path='/Login' Component={Login}></Route>
            <Route path='/Registration' Component={Registration}></Route>
         </Routes>
         </BrowserRouter>
    )
}

export default App