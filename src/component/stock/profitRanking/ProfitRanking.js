import React from "react";
import UserRank from "./UserRank";

const ProfitRanking = ({ranking}) => {

    return(
        <div className="mr-20 border shadow-2xl drop-shadow-sm" style={{width:"253px", height:"375px"}}>
            <div className="w-full">
                <div className="mt-2 font-bold text-xl text-center">수익률 랭킹</div>
                {
                    ranking.map((data, index) => {
                        return (<UserRank nickname={data} index={index + 1}/>);
                    })
                }
            </div>
        </div>
    )
}

export default ProfitRanking;