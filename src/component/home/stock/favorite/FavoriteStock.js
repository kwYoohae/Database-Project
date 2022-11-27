import React from "react";

const FavoriteStock = ({data, key}) => {
    return(
        <tr className="m-4" key={key}>
            <td className="text-center bg-emerald-400 p-2 m-4 rounded-xl text-white">{data.company_name}</td>
            <td className="text-center bg-emerald-400 p-2 m-4 rounded-xl text-white">{data.price.toLocaleString("ko-KR")}₩</td>
            {data.profit >= 0 ? <td className=" m-4 text-sm text-center bg-red-300 text-red-600 p-2 rounded-xl">📈 +{data.profit.toLocaleString("ko-KR")}%</td>
                : <td className="m-4 bg-blue-300 text-sm text-center text-blue-600 p-2 rounded-xl">📉 {data.profit.toLocaleString("ko-KR")}%</td>}
        </tr>
    )
}

export default FavoriteStock;