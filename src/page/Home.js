import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Header from "../component/Header";

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
            <button onClick={onTest}>로그아웃</button>
        </div>
    )
}

export default Home;