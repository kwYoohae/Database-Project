import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../component/Header";
import WriteBox from "../component/community/WriteBox";

const CommunityWrite = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!sessionStorage.getItem("user"))
            navigate("/login");
    })

    return(
        <div>
            <Header />
            <div className="flex flex-row justify-center overscroll-y-auto">
                <WriteBox/>
            </div>
        </div>
    )
}

export default CommunityWrite;