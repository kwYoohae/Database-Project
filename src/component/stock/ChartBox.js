import React, {useEffect} from "react";
import StockChart from "./StockChart";
import {Star, StarBorder} from "@mui/icons-material";
import axios from "axios";

const ChartBox = ({star, setStart, data, stockName, setDay, day, searchHandler}) => {
    const handlerDay = (e) => {
        console.log(e.target.value);
        setDay(e.target.value);
        searchHandler(e.target.value);
    }

    const handlerStar = (e) => {
        changeStar(!star);
    }

    const changeStar = (changedStar) => {
        const reqData = {
            name: stockName,
            user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
            star: changedStar,
        }
        if (changedStar) {
            axios.post('http://localhost:3001/add-star', reqData)
                .then((res) => {
                    if (res.data.success === true) {
                        setStart(changedStar);
                    }
                });
        } else {
            axios.post('http://localhost:3001/sub-star', reqData)
                .then((res) => {
                    if (res.data.success === true) {
                        setStart(changedStar);
                    }
                });
        }

    }

    return(
        <div className="border shadow-2xl drop-shadow-md" style={{height:"400px", width:"1080px"}}>
            <div className="flex justify-center mt-2">
                <span></span>
                {
                    star ? <button onClick={handlerStar}><Star fontSize={"large"} className="mx-2 mt-1 text-yellow-400 font-bold"/></button>
                        : <button onClick={handlerStar}><StarBorder fontSize={"large"} className="mx-2 mt-1 text-yellow-400 font-bold"/></button>
                }
                <div className="font-bold text-xl text-center bg-emerald-300 py-2 px-4 rounded-3xl mx-2">{stockName} 주가</div>
                <select className="bg-blue-200 px-2 rounded-2xl mr-2" onChange={handlerDay} value={day}>
                    <option value={"7"}>7일</option>
                    <option value={"30"}>한달</option>
                    <option value={"180"}>6개월</option>
                    <option value={"365"}>1년</option>
                </select>
            </div>
            <StockChart data={data}/>
        </div>
    );
};

export default ChartBox;