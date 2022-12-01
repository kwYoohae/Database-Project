import React, {useEffect, useState} from "react";
import Header from "../component/Header";
import {useNavigate} from "react-router-dom";
import UserInfo from "../component/admin/UserInfo";
import axios from "axios";
import UserInfoDetail from "../component/admin/UserInfoDetail";
import CompanyInfo from "../component/admin/company/CompanyInfo";

const Admin = () => {

    const [user, setUser] = useState([]);
    const [company, setCompany] = useState([]);
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
        axios.post(process.env.REACT_APP_BACKEND_SERVER+'/admin/user', user_id)
            .then((res) => {
                setUser(res.data.user_data)
            })

        axios.post(process.env.REACT_APP_BACKEND_SERVER+'/admin/company', user_id)
            .then((res) => {
                setCompany(res.data.company)
            })
    }, [])

    return (
        <div>
            <Header/>
            <div className="flex flex-col">
                <UserInfo user={user}/>
                <CompanyInfo company={company}/>
            </div>
        </div>
    )
}

export default Admin;