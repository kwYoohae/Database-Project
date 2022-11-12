import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";

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
            <button onClick={onTest}>test</button>
        </div>
    )
}

export default Home;