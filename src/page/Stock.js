import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import SearchBar from "../component/home/SearchBar";
import MyMoney from "../component/home/MyMoney";
import ChartBox from "../component/stock/ChartBox";
import TradingSystem from "../component/stock/TradingSystem";
import TradingHistoryBox from "../component/stock/tradingHistory/TradingHistoryBox";

const Stock = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(undefined);
    const [stockName, setName] = useState("삼성전자");
    const [chartData, setChartData] = useState([]);
    const [money, setMoney] = useState(0);

    const [search, setSearch] = useState("삼성전자");
    const [day, setDay] = useState("7");

    const searchHandler = (e) => {
        console.log("들어왔심다 : ", day);
        const reqData = {
            name: search,
            day: day
        }

        axios.post('http://localhost:3001/chart', reqData)
            .then((res) => {
                if (res.data.success === false) {
                    if (res.data.searchData === true) {
                        alert('알 수 없는 에러가 발생했습니다.')
                    } else {
                        alert('검색하려는 정보가 DB에 없습니다.')
                    }
                } else {
                    setName(res.data.stock_name);
                    setChartData(res.data.chart_data);
                    console.log(chartData);
                }
            });
    }

    const searchForDayHandler = (date) => {
        console.log("들어왔심다 : ", date);
        const reqData = {
            name: search,
            day: date
        }

        axios.post('http://localhost:3001/chart', reqData)
            .then((res) => {
                if (res.data.success === false) {
                    if (res.data.searchData === true) {
                        alert('알 수 없는 에러가 발생했습니다.')
                    } else {
                        alert('검색하려는 정보가 DB에 없습니다.')
                    }
                } else {
                    setName(res.data.stock_name);
                    setChartData(res.data.chart_data);
                    console.log(chartData);
                }
            });
    }

    useEffect(() => {
        if (!sessionStorage.getItem("user"))
            navigate("/login");

        axios.post('http://localhost:3001/stock', JSON.parse(sessionStorage.getItem("user")))
            .then((res) => {
                // console.log(res.data);
                setData(res.data);
                setMoney(JSON.parse(sessionStorage.getItem("user")).cash);
                setChartData([]);
                let temp = [];
                res.data.sharePrice.map((dayData) => {
                    temp.push({
                        name: dayData.date,
                        주가: dayData.share_price
                    })
                });

                setChartData(temp);
            }).catch((error) => {
            console.log(error);
        });
    }, [])

    const isDataEmpty = () => {
        if (data === undefined || data.length === 0) {
            return (<></>);
        }
        return (<div className="flex flex-col">
            <div className="flex flex-row mx-auto">
                <SearchBar setSearch={setSearch} searchHandler={searchHandler}/>
                <MyMoney userMoney={money}/>
            </div>
            <div className="mt-10 flex flex-row mx-auto">
                <ChartBox data={chartData} stockName={stockName} setDay={setDay} day={day} searchHandler={searchForDayHandler}/>
            </div>
            <div className="flex flex-row mt-10 mx-auto mb-20">
                <TradingHistoryBox historyData={data.tradingHistory}/>
                <TradingSystem/>
            </div>
        </div>)
    }

    return (
        <div>
            <Header/>
            {
                isDataEmpty()
            }
        </div>
    )
}

export default Stock;