import React from "react";

const TradingHistory = ({historyData}) => {
    return(
        <tr className="text-sm">
            <td>{historyData.date}</td>
            <td>{historyData.company_name}</td>
            <td>{historyData.share_amount}</td>
            <td>{historyData.share_price.toLocaleString("ko-KR")}</td>
            <td>{historyData.trading_type}</td>
        </tr>
    )
}

export default TradingHistory;