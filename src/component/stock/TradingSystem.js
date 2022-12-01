import React, {useState} from "react";
import axios from "axios";

const TradingSystemBox = () => {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);

    const handlerName = (e) => {
        setName(e.target.value);
    }

    const handlerAmount = (e) => {
        setAmount(parseInt(e.target.value));
    }

    const buyStock = () => {
        if (name.trim().length === 0) {
            alert('매매하려고 하는 주식을 입력해주세요');
            return;
        }

        if (amount <= 0) {
            alert('매매하려고 하는 수량은 음수가 될 수 없습니다.');
            return;
        }

        const reqData = {
            user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
            amount: amount,
            name: name
        }

        axios.post(process.env.REACT_APP_BACKEND_SERVER+'/buy-stock', reqData)
            .then((res) => {
                console.log(res.data);
                if (res.data.success === false) {
                    if (res.data.msg === "transaction fail") {
                        alert('트랙잭션에 실패하였습니다.');
                    }
                    else if (res.data.msg === "no exists stock") {
                        alert('존재하지 않는 주식입니다. 매매하려고 하는 이름을 다시 확인해주세요');
                    }
                    else if (res.data.msg === "not enough money") {
                        alert('보유금액보다 더 큰 가격으로 주식을 구매하려 하고 있습니다.');
                    }
                } else if (res.data.success === true) {
                    alert('주식 구매에 성공하셨습니다.');
                    window.location.reload();
                }
            })
    }

    const sellStock = () => {
        if (name.trim().length === 0) {
            alert('매매하려고 하는 주식을 입력해주세요');
            return;
        }

        if (amount <= 0) {
            alert('매매하려고 하는 수량은 음수가 될 수 없습니다.');
            return;
        }

        const reqData = {
            user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
            amount: amount,
            name: name
        }

        axios.post(process.env.REACT_APP_BACKEND_SERVER+'/sell-stock', reqData)
            .then((res) => {
                console.log(res.data);
                if (res.data.success === false) {
                    if (res.data.msg === "transaction fail") {
                        alert('트랙잭션에 실패하였습니다.');
                    }
                    else if (res.data.msg === "no exists stock") {
                        alert('존재하지 않는 주식입니다. 매매하려고 하는 이름을 다시 확인해주세요');
                    }
                    else if (res.data.msg === "not enough stock") {
                        alert('보유주식보다 더 큰 주식을 핀매하려 하고 있습니다.');
                    }
                } else if (res.data.success === true) {
                    alert('주식 구매에 성공하셨습니다.');
                    window.location.reload();
                }
            })
    }

    return (
        <div className="border shadow-2xl drop-shadow-md" style={{width:"400px", height:"400px"}}>
            <div className="grid grid-cols-6 gap-2">
                <div className="col-start-2 col-span-4 font-bold text-xl text-center mt-2 bg-emerald-300 py-2 px-4 rounded-3xl my-4">주식 거래 시스템</div>
                <label for="stockName" className="col-start-2 col-span-2">주식이름</label>
                <input onChange={handlerName} id="stockName" name="stockName" className="col-start-2 col-span-4 p-2 rounded-xl mb-2" placeholder="주식 이름을 입력해주세요"/>
                <label htmlFor="stockName" className="col-start-2 col-span-2">매매/매도 수량</label>
                <input onChange={handlerAmount} id="stockName" name="stockName" className="col-start-2 col-span-4 p-2 rounded-xl" type="number" min="1" placeholder="매수/매도 할 수량을 입력해주세요"/>
                <button onClick={buyStock} className="col-start-2 col-end-4 py-2 mt-4 border rounded-xl bg-red-500 text-white" >매수</button>
                <button onClick={sellStock} className="col-end-6 col-span-2 mt-4 py-2 border rounded-xl bg-blue-500 text-white" >매도</button>
            </div>
        </div>
    );
};

export default TradingSystemBox;