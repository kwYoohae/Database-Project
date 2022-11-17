import React, {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Header from "../component/Header";
import TodayStock from "../component/stock/todayStock/TodayStock";
import ProfitRanking from "../component/stock/profitRanking/ProfitRanking";
import PortfolioBox from "../component/stock/portfolio/PortfolioBox";
import SearchBar from "../component/home/SearchBar";
import MyMoney from "../component/home/MyMoney";
import NewsBox from "../component/news/NewsBox";
import axios from "axios";

const Home = () => {

    const [user, setUser] = useState(undefined);

    // const user = {
    //     userMoney: 1200000,
    //     todayStock: [
    //         {stockCode: "005930", stockName: "삼성전자", stockPrice: 53500, stockProfit: 21.7},
    //         {stockCode: "001830", stockName: "SK하이닉스", stockPrice: 132600, stockProfit: -8.6},
    //     ],
    //     ranking: [
    //         {nickname:"유해찬", profit:576.1},
    //         {nickname:"해찬유", profit:523.1},
    //         {nickname:"찬해유", profit:431.1},
    //     ],
    //     portfolio: {
    //         totalPrice: 1205000,
    //         portfolioDetail: [
    //             {stockName: "삼성전자", revenue: 1500000},
    //             {stockName: "SK하이닉스", revenue: -300000},
    //             {stockName: "셀트리온", revenue: 5000}
    //         ]
    //     },
    //     news:[
    //         {news_date:"2021-01-01", news_title:"김보성바보", news_url:"https://www.kw.ac.kr"}
    //     ]
    // }

    const navigate = useNavigate();

    const isUserEmpty = () => {
        if (user === undefined) {
            return (<></>);
        }
        return (<div>
            <div className="mt-10 flex justify-center">
                <SearchBar/>
                <MyMoney userMoney={user.holdingStockValue.value}/>
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
                .then((res) => {
                    console.log(res.data);
                    setUser(res.data);
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