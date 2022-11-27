import React, {useState} from "react";
import UserInfoDetail from "../UserInfoDetail";
import UserUpdateModal from "../UserUpdateModal";
import CompanyInfoDetail from "./CompanyInfoDetail";
import CompanyModal from "./CompanyModal";
import CompanyInsert from "./CompanyInsert";

const CompanyInfo = ({company}) => {

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState();

    return(
        <div>
            <div className="boarder shadow-2xl drop-shadow-md mx-auto mt-20 mb-20"
                 style={{height: "400px", width: '1080px', overflow: "scroll"}}>
                <div className="ml-5 mt-5">
                    <span className="text-xl font-bold">회사 정보 관리</span>
                </div>
                <CompanyInsert/>
                <table className="border-separate border-spacing-x-4 border-spacing-y-2 table-auto text-left text-sm">
                    <thead>
                    <tr>
                        <th>주가 번호</th>
                        <th>회사 이름</th>
                        <th>분야</th>
                        <th>회사소개</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        company.length > 0 ? company.map((data) => {
                            return(<CompanyInfoDetail setModal={setModal} modal={modal} company={data} setEditData={setEditData} editData={editData} key={data.stock_code}/>);
                        }) : <></>
                    }
                    </tbody>
                </table>
            </div>
            {modal ? <CompanyModal setModal={setModal} modal={modal} setEditData={setEditData} editData={editData}  /> : <></>}
        </div>
    )
}

export default CompanyInfo;
