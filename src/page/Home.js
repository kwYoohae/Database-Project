import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Header from "../component/Header";
import TodayStock from "../component/TodayStock";

const Home = () => {

    const onTest = (e) => {
        sessionStorage.removeItem("user");
    }

    const navigate = useNavigate();

    useEffect(
        () =>{
            if(!sessionStorage.getItem("user"))
                return navigate('/login');
        }, []
    )

    return (
        <div>
            <Header/>
            <div id="body" className="flex-col">
                <div className="flex-left ml-20">
                    <TodayStock/>
                </div>
            </div>
        </div>
    )
}

export default Home;