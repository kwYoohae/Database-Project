import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Stock = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(!sessionStorage.getItem("user"))
            navigate("/login");
    }, [])

    return(
        <div>

        </div>
    )
}

export default Stock;