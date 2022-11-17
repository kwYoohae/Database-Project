import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Header from "../component/Header";
import TodayStock from "../component/stock/todayStock/TodayStock";
import ProfitRanking from "../component/stock/profitRanking/ProfitRanking";
import PortfolioBox from "../component/stock/portfolio/PortfolioBox";
import SearchBar from "../component/home/SearchBar";
import MyMoney from "../component/home/MyMoney";

const Home = () => {

    const user = {
        userMoney: 1200000,
        todayStock: [
            {stockCode: "005930", stockName: "삼성전자", stockPrice: 53500, stockProfit: 21.7},
            {stockCode: "001830", stockName: "SK하이닉스", stockPrice: 132600, stockProfit: -8.6},
        ],
        ranking: [
            "유해찬", "찬유해", "해찬유", "찬찬찬"
        ],
        portfolio: {
            totalPrice: 1205000,
            portfolioDetail: [
                {stockName: "삼성전자", revenue: 1500000},
                {stockName: "SK하이닉스", revenue: -300000},
                {stockName: "셀트리온", revenue: 5000}
            ]
        },
    }

    const navigate = useNavigate();

    useEffect(
        () => {
            if (!sessionStorage.getItem("user"))
                return navigate('/login');
        }, []
    )

    return (
        <div>
            <Header/>
            <div className="mt-10 flex justify-center">
                <SearchBar/>
                <MyMoney userMoney={user.userMoney}/>
            </div>
            <div id="body" className="mt-20 flex flex-row justify-center">
                <TodayStock todayStockData={user.todayStock}/>
                <ProfitRanking ranking={user.ranking}/>
                <PortfolioBox portfolio={user.portfolio}/>
            </div>
        </div>
    )
}

export default Home;