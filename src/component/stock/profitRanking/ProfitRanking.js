import React from "react";
import UserRank from "./UserRank";

const ProfitRanking = ({ranking}) => {

    return(
        <div key={ranking} className="mr-10 border shadow-2xl drop-shadow-sm" style={{width:"253px", height:"375px"}}>
            <div className="w-full">
                <div className="mt-2 font-bold text-xl text-center">수익률 랭킹</div>
                {
                    ranking.length === 0 ? <div>정보가 없습니다.</div> :
                        ranking.map((data, index) => {
                            return (<UserRank nickname={data.id} index={index + 1}/>);
                        })
                }
            </div>
        </div>
    )
}

export default ProfitRanking;