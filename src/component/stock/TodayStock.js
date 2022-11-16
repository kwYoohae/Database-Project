import React from 'react';
import StockInfo from "./StockInfo";
const TodayStock = () => {

    const user = {
        todayStock : [
            {stockCode:"005930", stockName:"삼성전자", stockPrice:53500, stockProfit:21.7},
            {stockCode:"001830", stockName:"SK하이닉스", stockPrice:132600, stockProfit:-8.6},
        ]
    }

    return (
        <div className="border mt-40 drop-shadow-2xl" style={{width: "767px", height: "375px"}}>
            <div className="w-full text-center">
                <div>

                </div>
            </div>
            <table className="w-full border-spacing-0.5">
                <tr>
                    <th colSpan="4" className=" border-b pt-2 pl-2 text-left">오늘의 주식</th>
                </tr>
                <tbody>
                {
                    user.todayStock.map((data) => {
                        return (<StockInfo stockCode={data.stockCode} stockName={data.stockName} stockPrice={data.stockPrice} stockProfit={data.stockProfit} />)
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default TodayStock;