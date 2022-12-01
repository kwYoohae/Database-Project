import React, {useState} from "react";
import axios from "axios";

const CompanyModal = ({modal, setModal, editData, setEditData}) => {

    const [name, setName] = useState(editData.company_name);
    const [sector, setSector] = useState(editData.sector);
    const [info, setInfo] = useState(editData.company_info);

    const closeModal = () => {
        setModal(!modal);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleSector = (e) => {
        setSector(e.target.value);
    }
    const handleInfo = (e) => {
        setInfo(e.target.value);
    }

    const updateCompany = () => {

        const data = {user_id:JSON.parse(sessionStorage.getItem("user")).user_id, stock_code:editData.stock_code, name:name, sector:sector, info:info};

        axios.post(process.env.REACT_APP_BACKEND_SERVER+'/admin/company-update', data)
            .then((res) => {
                if (res.data.success === true) {
                    alert('성공적으로 변경되었습니다. ');
                    window.location.reload();
                } else {
                    alert('변경에 실패하였습니다.');
                }
            })
    }

    return(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center" style={{backgroundColor:"rgba(0,0,0,0.4)"}}>
            <div className="absolute w-96 bg-white" style={{height:"400px"}}>
                <div className="text-right font-bold text-gray-500 text-xl mr-4 mt-2"><button onClick={closeModal}>X</button></div>
                {
                    editData || editData !== undefined ? (
                        <div className="ml-4 flex flex-col mr-2">
                            <label htmlFor="stock_code" className="ml-1 ">주가 번호</label>
                            <input id="stock_code" disabled={true} value={editData.stock_code} className="border p-1 rounded-2xl"/>
                            <label htmlFor="company_name" className="ml-1 ">회사 이름</label>
                            <input id="company_name" onChange={handleName} value={name} className="border p-1 rounded-2xl"/>
                            <label htmlFor="sector" className="ml-1 ">분야</label>
                            <input id="sector" onChange={handleSector} value={sector} className="border p-1 rounded-2xl"/>
                            <label htmlFor="company_info" className="ml-1 ">회사 소개</label>
                            <textarea id="company_info" onChange={handleInfo} value={info} className="border p-1 rounded-2xl"/>
                            <button onClick={updateCompany} className="mt-4 p-2 bg-emerald-300 font-bold">수정하기</button>
                        </div>
                    ): <></>
                }
            </div>
        </div>
    )
}

export default CompanyModal;