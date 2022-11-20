import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Stock = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (!sessionStorage.getItem("user"))
            navigate("/login");

        axios.post('http://localhost:3001/stock', JSON.parse(sessionStorage.getItem("user")))
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            }).catch((error) => {
            console.log(error);
        });
    }, [])

    return (
        <div>

        </div>
    )
}

export default Stock;