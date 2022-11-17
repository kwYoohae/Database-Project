import React from "react";
import StockProfit from "./StockProfit";

const StockInfo = ({stockCode, stockName, stockPrice, stockProfit}) => {
    return (
        <tr key={stockCode} className="h-12">
            <td colSpan="4">
                <span className="bg-emerald-300 mx-4 text-white p-2 rounded-xl">{stockCode}</span>
                <span>{stockName}</span>
                <div className="float-right">
                    <span className="mx-2 p-2">{stockPrice.toLocaleString('ko-KR')}₩</span>
                    <StockProfit stockProfit={stockProfit} />
                </div>
            </td>
        </tr>
    );
}

export default StockInfo;