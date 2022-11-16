import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Header from "../component/Header";
import TodayStock from "../component/stock/todayStock/TodayStock";
import ProfitRanking from "../component/stock/profitRanking/ProfitRanking";
import PortfolioBox from "../component/stock/portfolio/PortfolioBox";

const Home = () => {

    const user = {
        todayStock : [
            {stockCode:"005930", stockName:"삼성전자", stockPrice:53500, stockProfit:21.7},
            {stockCode:"001830", stockName:"SK하이닉스", stockPrice:132600, stockProfit:-8.6},
        ],
        ranking : [
            "유해찬","찬유해","해찬유","찬찬찬"
        ],
        portfolio : {
            totalPrice: 1205000,
            portfolioDetail:[
                {stockName: "삼성전자", revenue: 1500000},
                {stockName: "SK하이닉스", revenue: -300000},
                {stockName: "셀트리온", revenue: 5000}
            ]
        }
    }

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
            <div id="body" className="flex flex-row">
                <TodayStock todayStockData={user.todayStock}/>
                <ProfitRanking ranking={user.ranking} />
                <PortfolioBox portfolio={user.portfolio} />
            </div>
        </div>
    )
}

export default Home;