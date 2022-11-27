import React, {useState} from "react";
import axios from "axios";

const CompanyInsert = () => {

    const [stockCode, setCode] = useState("");
    const [name, setName] = useState("");
    const [sector, setSector] = useState("");
    const [info, setInfo] = useState("");

    const codeHandler = (e) => {
        setCode(e.target.value);
    }
    const nameHandler = (e) => {
        setName(e.target.value);
    }
    const sectorHandler = (e) => {
        setSector(e.target.value);
    }
    const infoHandler = (e) => {
        setInfo(e.target.value);
    }

    const insertCompany = (e) => {

        if (stockCode.trim().length === 0) {
            alert('주식코드를 입력하셔야합니다.');
            return;
        }

        if (name.trim().length === 0) {
            alert('회사 이름을 입력하셔야합니다.');
            return;
        }

        if (sector.trim().length === 0) {
            alert('분야를 입력하셔야합니다.');
            return;
        }

        if (info.trim().length === 0) {
            alert('회사 설명을 입력하셔야합니다.');
            return;
        }
        const company = {
            user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
            stock_code: stockCode,
            company_name: name,
            sector: sector,
            company_info: info
        }
        axios.post('http://localhost:3001/admin/company-insert', company)
            .then((res) => {
                if (res.data.success === true) {
                    alert('회사 생성에 성공하셨습니다.');
                    window.location.reload();
                } else {
                    alert('회사 생성에 실패하셨습니다.');
                }
            })
    }

    return(
        <div className="flex flex-row mt-2">
            <div className="flex flex-col mx-5">
                <label for="stock_code">주식코드</label>
                <input onChange={codeHandler} placeholder="주식 코드를 입력해주세요"/>
            </div>
            <div className="flex flex-col mx-5">
                <label htmlFor="name">회사 이름</label>
                <input onChange={nameHandler} placeholder="회사이름을 입력해주세요"/>
            </div>
            <div className="flex flex-col mx-5">
                <label htmlFor="stock_code">종목 분야</label>
                <input onChange={sectorHandler} placeholder="종목 분야 입력해주세요"/>
            </div>
            <div className="flex flex-col mx-5">
                <label htmlFor="stock_code">회사 설명</label>
                <input onChange={infoHandler} className="w-60" placeholder="회사 설명을 입력해주세요"/>
            </div>
            <button onClick={insertCompany} className="ml-5 px-2 rounded-2xl bg-emerald-300 font-bold">추가하기</button>
        </div>
    )
}

export default CompanyInsert;