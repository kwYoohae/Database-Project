import React, {useEffect} from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import {useLocation, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import './community/page/Paging.css';

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const logOut = (e) => {
        sessionStorage.removeItem("user");
        return navigate('/login');
    }

    useEffect(() => {
        let home = document.getElementById("home");
        let stock = document.getElementById("stock");
        let community = document.getElementById("community");
        let setting = document.getElementById("setting");
        let admin = document.getElementById("admin");

        if (location.pathname === '/') {
            home.style.color = "white";
            stock.style.color = "black";
            community.style.color = "black";
            setting.style.color = "black";
            // admin.style.color = "black";
        } else if (location.pathname === '/stock') {
            home.style.color = "black";
            stock.style.color = "white";
            community.style.color = "black";
            setting.style.color = "black";
            // admin.style.color = "black";
        } else if (location.pathname.includes('/community')) {
            home.style.color = "black";
            stock.style.color = "black";
            community.style.color = "white";
            setting.style.color = "black";
            // admin.style.color = "black";
        } else if (location.pathname.includes('/setting')) {
            home.style.color = "black";
            stock.style.color = "black";
            community.style.color = "black";
            setting.style.color = "white";
            // admin.style.color = "black";
        } else if (location.pathname.includes('/admin')) {
            home.style.color = "black";
            stock.style.color = "black";
            community.style.color = "black";
            setting.style.color = "black";
            admin.style.color = "white";
        }
    },[])

    return (
        <div className="w-full h-16 bg-emerald-600">
            <div className="float-left table mt-4">
                <div className={"flex-col table-cell"}>
                    <ExitToAppIcon className="text-white ml-20 align-middle" fontSize="large" onClick={logOut} />
                    <Link to="/"><span className="text-2xl ml-3 font-bold align-middle">📈 L2-Cache Finance</span></Link>
                </div>
            </div>
            <div className="float-right table mt-4">
                <div className={"flex-row table-cell"}>
                    <span id="home" className="text-2xl font-bold align-middle mx-3"><Link to="/">홈화면</Link></span>
                    <span id="stock" className="text-2xl font-bold align-middle mx-3"><Link to="/stock">주식 구매</Link></span>
                    <span id="community" className="text-2xl font-bold align-middle mx-3"><Link to="/community">커뮤니티</Link></span>
                    {!sessionStorage.getItem("user") ? <></> : JSON.parse(sessionStorage.getItem("user")).user_id === 'admin' ? <span id="admin" className="text-2xl font-bold align-middle mx-3"><Link to="/admin">어드민</Link></span>
                    : <></>}
                </div>
            </div>
        </div>
    )
}

export default Header;