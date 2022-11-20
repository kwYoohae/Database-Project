import React, {useEffect} from "react";
import StockChart from "./StockChart";

const ChartBox = ({data, stockName}) => {

    useEffect(() => {

    },[]);

    return(
        <div className="border mx-10 shadow-2xl drop-shadow-sm shadow-2xl" style={{width:"683px", height:"400px"}}>
            <div className="flex justify-center">
                <span className="font-bold text-xl text-center mt-2 bg-emerald-300 p-2 rounded-3xl">{stockName} 주가</span>
            </div>
            <StockChart data={data}/>
        </div>
    );
};

export default ChartBox;