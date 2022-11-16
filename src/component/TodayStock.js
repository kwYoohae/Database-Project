import React from 'react';
import StockInfo from "./stock/stockInfo";
const TodayStock = () => {
    return (
        <div className="border mt-40 drop-shadow-2xl" style={{width: "767px", height: "375px"}}>
            <div className="w-full text-center">
                <div>

                </div>
            </div>
            <table className="w-full border-spacing-0.5">
                <tr>
                    <th colSpan="4" className=" border-b pt-2 pl-2 text-left">오늘의 주식</th>
                </tr>
                <tbody>
                    <StockInfo />
                    <StockInfo />
                    <StockInfo />
                    <StockInfo />
                    <StockInfo />
                    <StockInfo />
                    <StockInfo />
                </tbody>
            </table>
        </div>
    )
}

export default TodayStock;