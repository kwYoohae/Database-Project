import React from 'react';
import StockInfo from "./StockInfo";
const TodayStock = ({todayStockData}) => {

    return (
        <div className="border mx-20 shadow-2xl drop-shadow-sm" style={{width: "663px", height: "375px"}}>
            <table className="w-full border-spacing-0.5">
                <tr>
                    <th colSpan="4" className=" border-b pt-2 pl-2 text-left text-xl">오늘의 주식</th>
                </tr>
                <tbody>
                {
                    todayStockData.isEmpty ? <div>정보가 없습니다.</div> :
                        todayStockData.map((data) => {
                            return (<StockInfo stockCode={data.stockCode} stockName={data.stockName} stockPrice={data.stockPrice} stockProfit={data.stockProfit} />)
                        })
                }
                </tbody>
            </table>
        </div>
    )
}

export default TodayStock;