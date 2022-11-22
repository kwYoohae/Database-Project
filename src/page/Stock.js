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

    useEffect(() => {
        if (!sessionStorage.getItem("user"))
            navigate("/login");

        axios.post('http://localhost:3001/stock', JSON.parse(sessionStorage.getItem("user")))
            .then((res) => {
                // console.log(res.data);
                setData(res.data);
                setMoney(JSON.parse(sessionStorage.getItem("user")).cash);
                setChartData([]);
                console.log(data.tradingHistory);
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
                <SearchBar />
                <MyMoney userMoney={money}/>
            </div>
            <div className="mt-10 flex flex-row mx-auto">
                <ChartBox data={chartData} stockName={stockName}/>
            </div>
            <div className="flex flex-row mt-10 mx-auto">
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