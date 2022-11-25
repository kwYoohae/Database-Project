import React, {useEffect, useState} from "react";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

import {Route, Routes} from "react-router-dom";
import NotFound from "./page/NotFound";
import Home from "./page/Home";
import Stock from "./page/Stock";
import Community from "./page/Community";
import CommunityWrite from "./page/CommunityWrite";

const App = () => {

    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/stock" element={<Stock />} />
                <Route path="/community" element={<Community />} />
                <Route path="/community/write" element={<CommunityWrite/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;