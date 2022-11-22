import React from "react";

const TradingSystemBox = () => {
    return (
        <div className="border shadow-2xl drop-shadow-md" style={{width:"400px", height:"400px"}}>
            <div className="grid grid-cols-6 gap-2">
                <div className="col-start-2 col-span-4 font-bold text-xl text-center mt-2 bg-emerald-300 py-2 px-4 rounded-3xl my-4">주식 거래 시스템</div>
                <label for="stockName" className="col-start-2 col-span-2">주식이름</label>
                <input id="stockName" name="stockName" className="col-start-2 col-span-4 p-2 rounded-xl mb-2" placeholder="주식 이름을 입력해주세요"/>
                <label htmlFor="stockName" className="col-start-2 col-span-2">매매/매도 수량</label>
                <input id="stockName" name="stockName" className="col-start-2 col-span-4 p-2 rounded-xl" type="number" min="1" placeholder="매수/매도 할 수량을 입력해주세요"/>
                <button className="col-start-2 col-end-4 py-2 mt-4 border rounded-xl bg-red-500 text-white" >매수</button>
                <button className="col-end-6 col-span-2 mt-4 py-2 border rounded-xl bg-blue-500 text-white" >매도</button>
            </div>
        </div>
    );
};

export default TradingSystemBox;