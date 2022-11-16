import React, {useEffect} from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const logOut = (e) => {
        sessionStorage.removeItem("user");
        return navigate('/login');
    }

    const onTest = (e) => {
        axios.post("http://localhost:3001/home",JSON.parse(sessionStorage.getItem("user")))
            .then((res) => {
                console.log(res.data);
            })
    }

    useEffect(() => {
        let home = document.getElementById("home");
        let stock = document.getElementById("stock");
        let community = document.getElementById("community");

        if (location.pathname === '/') {
            home.style.color = "white";
            stock.style.color = "black";
            community.style.color = "black";
        } else if (location.pathname === '/stock') {
            home.style.color = "black";
            stock.style.color = "white";
            community.style.color = "black";
        } else if (location.pathname === '/community') {
            home.style.color = "black";
            stock.style.color = "black";
            community.style.color = "white";
        }
    },[])

    return (
        <div className="w-full h-16 bg-emerald-600">
            <div className="float-left table mt-4">
                <div className={"flex-col table-cell"}>
                    <ExitToAppIcon className="text-white ml-20 align-middle" fontSize="large" onClick={logOut} />
                    <span className="text-2xl ml-3 font-bold align-middle" onClick={onTest}>📈 L2-Cache Finance</span>
                </div>
            </div>
            <div className="float-right table mt-4">
                <div className={"flex-row table-cell"}>
                    <span id="home" className="text-2xl font-bold align-middle mx-3">홈화면</span>
                    <span id="stock" className="text-2xl font-bold align-middle mx-3">주식 구매</span>
                    <span id="community" className="text-2xl font-bold align-middle mx-3">커뮤니티</span>
                    <PersonIcon className="align-middle mr-20" fontSize="large" onClick={logOut} />
                </div>
            </div>
        </div>
    )
}

export default Header;