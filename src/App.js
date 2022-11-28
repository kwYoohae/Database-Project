import React, {useEffect, useState} from "react";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

import {Route, Routes} from "react-router-dom";
import NotFound from "./page/NotFound";
import Home from "./page/Home";
import Stock from "./page/Stock";
import Community from "./page/Community";
import CommunityWrite from "./page/CommunityWrite";
import CommunityPost from "./page/CommunityPost";
import Setting from "./page/Setting";
import Admin from "./page/Admin";
import CommunityUpdate from "./page/CommunityUpdate";

const App = () => {

    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/stock" element={<Stock />} />
                <Route path="/community" element={<Community />} />
                <Route path="/community/update/:board_id" element={<CommunityUpdate/>}/>
                <Route path="/community/:boardId" element={<CommunityPost/>}/>
                <Route path="/community/write" element={<CommunityWrite/>}/>
                <Route path="/setting" element={<Setting/>}/>
                <Route path="/admin" element={<Admin />} />
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;