import React, {useEffect} from "react";
import StockChart from "./StockChart";

const ChartBox = ({data, stockName, setDay, day, searchHandler}) => {

    useEffect(() => {

    },[]);


    const handlerDay = (e) => {
        console.log(e.target.value);
        setDay(e.target.value);
        searchHandler(e.target.value);
    }


    return(
        <div className="border shadow-2xl drop-shadow-md" style={{height:"400px", width:"1080px"}}>
            <div className="flex justify-around mt-2">
                <span></span>
                <div className="font-bold text-xl text-center bg-emerald-300 py-2 px-4 rounded-3xl">{stockName} 주가</div>
                <select className="bg-blue-200 px-2 rounded-2xl" onChange={handlerDay} value={day}>
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