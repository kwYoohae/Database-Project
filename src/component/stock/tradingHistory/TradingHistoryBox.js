import React from "react";
import PortfolioStock from "../portfolio/PortfolioStock";
import TradingHistory from "./TradingHistory";

const TradingHistoryBox = ({historyData}) => {
    return(
        <div className="border shadow-2xl drop-shadow-md mr-5 overscroll-y-auto" style={{width:"660px", height:"400px"}}>
            <div className="flex justify-center">
                <span className="font-bold text-xl text-center mt-2 bg-emerald-300 py-2 px-4 rounded-3xl">거래 기록</span>
            </div>
            <div className="flex justify-center">
                <table className="border-separate border-spacing-x-12 border-spacing-y-2 table-auto text-center">
                    <tr>
                        <th>매수/매매 일</th>
                        <th>주식 명</th>
                        <th>개수</th>
                        <th>주당 매수/매매 금액</th>
                        <th>매수/매매</th>
                    </tr>
                    {
                        historyData === undefined ? <tr><td>정보가 없습니다.</td></tr> :
                            historyData.map((data) => {
                                return (<TradingHistory historyData={data}/>)
                            })
                    }
                </table>
            </div>
        </div>
    )
}

export default TradingHistoryBox;