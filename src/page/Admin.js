import React, {useEffect, useState} from "react";
import Header from "../component/Header";
import {useNavigate} from "react-router-dom";
import UserInfo from "../component/admin/UserInfo";
import axios from "axios";
import UserInfoDetail from "../component/admin/UserInfoDetail";

const Admin = () => {

    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("user")) {
            navigate('/login');
        }

        if (JSON.parse(sessionStorage.getItem("user")).user_id !== 'admin') {
            alert('어드민만 들어올 수 있습니다.');
            navigate(-1);
        }

        const user_id = {user_id: JSON.parse(sessionStorage.getItem("user")).user_id};
        axios.post('http://localhost:3001/admin/user', user_id)
            .then((res) => {
                setUser(res.data.user_data)
            })
    }, [])

    return (
        <div>
            <Header/>
            <div className="flex flex-col">
                <UserInfo user={user}/>
            </div>
        </div>
    )
}

export default Admin;