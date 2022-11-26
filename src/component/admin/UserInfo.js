import React, {useEffect, useState} from "react";
import UserInfoDetail from "./UserInfoDetail";
import UserUpdateModal from "./UserUpdateModal";

const UserInfo = ({user}) => {

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState();

    return (
       <div>
           <div className="boarder shadow-2xl drop-shadow-md mx-auto mt-20"
                style={{height: "400px", width: '1080px', overflowY: "scroll"}}>
               <div className="ml-5 mt-5">
                   <span className="text-xl font-bold">회원정보 관리</span>
               </div>
               <table className="border-separate border-spacing-x-12 border-spacing-y-2 table-auto text-left">
                   <thead>
                   <tr>
                       <th>회원 아이디</th>
                       <th>비밀 번호</th>
                       <th>닉네임</th>
                       <th>나이</th>
                       <th>생성날짜</th>
                       <th>보유 현금액</th>
                       <th>수정</th>
                       <th>삭제</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                       user.length > 0 ? user.map((data) => {
                           return(<UserInfoDetail setModal={setModal} modal={modal} user={data} setEditData={setEditData} editData={editData} key={data.user_id}/>);
                       }) : <></>
                   }
                   </tbody>
               </table>
           </div>
           {modal ? <UserUpdateModal setModal={setModal} modal={modal} setEditData={setEditData} editData={editData}  /> : <></>}
       </div>
    )
}

export default UserInfo;