import React from "react";
import UserRank from "../profitRanking/UserRank";
import PortfolioStock from "./PortfolioStock";

const PortfolioBox = ({portfolio}) => {
    return(
        <div className="mt-40 border shadow-2xl drop-shadow-sm overflow-y-scroll" style={{width:"390px", height:"375px"}}>
            <div className="w-full">
                <div className="mt-2 font-bold text-xl text-center">내 포트폴리오</div>
                {
                    !portfolio.portfolioDetail ? <div>데이터가 존재하지 않습니다.</div> :
                        portfolio.portfolioDetail.map((data) => {
                            return(<PortfolioStock data={data}/>);
                        })
                }
                <div className="ml-5 font-bold text-xl">총 금액 : {portfolio.totalPrice.toLocaleString("ko-KR")}</div>
            </div>
        </div>
    )
}

export default PortfolioBox;
