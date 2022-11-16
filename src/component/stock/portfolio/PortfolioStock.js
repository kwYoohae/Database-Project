import React from "react";

const PortfolioStock = ({data}) => {
    return(
        <div className="text-left my-2 ml-4 leading-10 flex-row">
            <span className="bg-emerald-400 p-2 rounded-xl text-white">{data.stockName}</span>
            {data.revenue >= 0 ? <span className=" ml-4 text-right bg-red-300 text-red-600 p-2 rounded-xl">📈 +{data.revenue.toLocaleString("ko-KR")}₩</span>
            : <span className="ml-4 bg-blue-300 text-blue-600 p-2 rounded-xl">📉 {data.revenue.toLocaleString("ko-KR")}₩</span>}
        </div>
    )
}

export default PortfolioStock;