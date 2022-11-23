import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Header from "../component/Header";
import PostBox from "../component/community/PostBox";
import HotPost from "../component/community/HotPost";
import axios from "axios";

const Community = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryList = searchParams.get('board');

    useEffect(() => {
        if(!sessionStorage.getItem("user"))
            navigate("/login")
    },[]);

    return(
        <div>
            <Header />
            <div className="flex flex-row justify-center overscroll-y-auto">
                <PostBox />
                <HotPost />
            </div>
        </div>
    );
};

export default Community;