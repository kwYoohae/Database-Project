import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../component/Header";
import TodayStock from "../component/home/stock/todayStock/TodayStock";
import ProfitRanking from "../component/home/stock/profitRanking/ProfitRanking";
import PortfolioBox from "../component/home/stock/portfolio/PortfolioBox";
import SearchBar from "../component/home/SearchBar";
import MyMoney from "../component/home/MyMoney";
import NewsBox from "../component/home/news/NewsBox";
import axios from "axios";

const Home = () => {

    const [user, setUser] = useState(undefined);
    const [money, setMoney] = useState(0);

    const navigate = useNavigate();

    const isUserEmpty = () => {
        if (user === undefined || user.length === 0) {
            return (<></>);
        }
        return (<div>
            <div className="mt-10 flex justify-center">
                <SearchBar/>
                <MyMoney userMoney={money}/>
            </div>
            <div id="body" className="mt-20 flex flex-row justify-center">
                <TodayStock todayStockData={user.todayStock}/>
                <ProfitRanking ranking={user.ranking}/>
                <PortfolioBox portfolio={user.holdingStock} portfolioValue={user.portfolioValue.value}/>
            </div>
            <NewsBox news={user.news}/>
        </div>)
    }

    useEffect(
        () => {
            if (!sessionStorage.getItem("user"))
                return navigate('/login');

            axios.post('http://localhost:3001/home', JSON.parse(sessionStorage.getItem("user")))
                .then((res) => {;
                    setUser(res.data);
                    setMoney(JSON.parse(sessionStorage.getItem("user")).cash);
                }).catch((error) => {console.log(error);})
        }, []
    )

    return (
        <div>
            <Header/>
            {
                isUserEmpty()
            }
        </div>
    )
}

export default Home;