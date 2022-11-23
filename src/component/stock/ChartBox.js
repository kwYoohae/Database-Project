import React, {useEffect} from "react";
import StockChart from "./StockChart";

const ChartBox = ({data, stockName}) => {

    useEffect(() => {

    },[]);

    return(
        <div className="border shadow-2xl drop-shadow-md" style={{height:"400px", width:"1080px"}}>
            <div className="flex justify-center">
                <span className="font-bold text-xl text-center mt-2 bg-emerald-300 py-2 px-4 rounded-3xl">{stockName} 주가</span>
            </div>
            <StockChart data={data}/>
        </div>
    );
};

export default ChartBox;