import React from "react";
import UserRank from "../profitRanking/UserRank";
import PortfolioStock from "./PortfolioStock";

const PortfolioBox = ({portfolio, portfolioValue}) => {
    return(
        <div className="border shadow-2xl drop-shadow-sm overflow-y-scroll" style={{width:"370px", height:"375px"}}>
            <div className="w-full">
                <div className="mt-2 font-bold text-xl text-center">내 포트폴리오</div>
                <table className="border-separate border-spacing-2">
                    <tr>
                        <th>주식 명</th>
                        <th>수익률</th>
                        <th>구매 금액</th>
                    </tr>
                {
                    portfolio.length === 0 ? <div>데이터가 존재하지 않습니다.</div> :
                        portfolio.map((data) => {
                            return(<PortfolioStock data={data}/>);
                        })
                }
                </table>
                <div className="ml-5 font-bold text-xl">총 금액 : {!portfolioValue ? 0 : portfolioValue.toLocaleString("ko-KR")}</div>
            </div>
        </div>
    )
}

export default PortfolioBox;