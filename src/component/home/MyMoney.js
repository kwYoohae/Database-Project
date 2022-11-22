import React from "react";

const MyMoney = ({userMoney}) => {
    return(
        <div className="ml-48 mt-10 shadow-2xl border rounded-2xl" style={{width:"269px", height:"71px"}}>
            <div className="my-auto font-bold text-xl mt-5 ml-2">보유 금액 :
                {
                    !userMoney ? <span> 0원</span> :
                        <span className="text-lg"> {userMoney.toLocaleString("ko-KR")}원</span>
                }
            </div>
        </div>
    )
}

export default MyMoney;