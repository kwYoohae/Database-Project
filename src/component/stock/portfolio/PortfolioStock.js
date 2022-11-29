import React from "react";

const PortfolioStock = ({data}) => {
    return(
        <tr className="m-4">
            <td className="text-center bg-emerald-400 p-2 m-4 rounded-xl text-white">{data.stock_name}</td>
            <td className=" m-4 text-sm text-center p-2 rounded-xl">{data.value.toLocaleString("ko-KR")}₩</td>
            {data.profit >= 0 ? <td className=" m-4 text-sm text-center bg-red-300 text-red-600 p-2 rounded-xl">📈 +{data.profit.toLocaleString("ko-KR")}</td>
            : <td className="m-4 bg-blue-300 text-sm text-center text-blue-600 p-2 rounded-xl">📉 {data.profit.toLocaleString("ko-KR")}</td>}
        </tr>
    )
}

export default PortfolioStock;