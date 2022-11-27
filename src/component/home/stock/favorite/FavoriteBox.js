import React from "react";
import FavoriteStock from "./FavoriteStock";

const FavoriteBox = ({favoriteStock}) => {
    return (
        <div className="border shadow-2xl drop-shadow-sm overflow-y-scroll" style={{width: "370px", height: "375px"}}>
            <div className="w-full">
                <div className="mt-2 font-bold text-xl text-center">내 관심종목</div>
                <table className="border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th>주식 명</th>
                            <th>주식 금액</th>
                            <th>등락 비</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        favoriteStock.length === 0 ? <></> : favoriteStock.map((data) => {
                            return(<FavoriteStock data={data} key={data.share_code}/>)
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavoriteBox;
