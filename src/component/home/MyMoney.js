import React from "react";

const MyMoney = ({userMoney}) => {
    return(
        <div className="ml-20 shadow-2xl border" style={{width:"269px", height:"78px"}}>
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