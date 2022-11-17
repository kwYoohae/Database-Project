import React from 'react';
import StockInfo from "./StockInfo";
const TodayStock = ({todayStockData}) => {

    return (
        <div className="border mx-10 shadow-2xl drop-shadow-sm" style={{width: "663px", height: "375px"}}>
            <table className="w-full border-spacing-0.5">
                <tr>
                    <th colSpan="4" className=" border-b pt-2 pl-2 text-left text-xl">오늘의 주식</th>
                </tr>
                <tbody>
                {
                    todayStockData.length === 0 ? <div>정보가 없습니다.</div> :
                        todayStockData.map((data, index) => {
                            return (<StockInfo key={index} stockCode={data.code} stockName={data.name} stockPrice={data.price} stockProfit={Math.round(data.profit * 100) / 100} />)
                        })
                }
                </tbody>
            </table>
        </div>
    )
}

export default TodayStock;