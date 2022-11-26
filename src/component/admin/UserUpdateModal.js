import React, {useState} from "react";
import axios from "axios";

const UserUpdateModal = ({modal, setModal, editData, setEditData}) => {

    const [password, setPassword] = useState(editData.password);
    const [nickname, setNickname] = useState(editData.nickname);
    const [age, setAge] = useState(editData.age);
    const [cash, setCash] = useState(editData.cash);

    const closeModal = () => {
        setModal(!modal);
    }

    const handlerPassword = (e) => {
        setPassword(e.target.value);
    }
    const handlerNickname = (e) => {
        setNickname(e.target.value);
    }
    const handlerAge = (e) => {
        setAge(e.target.value);
    }
    const handlerCash = (e) => {
        setCash(e.target.value);
    }

    const updateUser = () => {

        const data = {user_id:JSON.parse(sessionStorage.getItem("user")).user_id, change_id:editData.user_id, password:password, nickname:nickname, age:age, cash:cash};

        axios.post('http://localhost:3001/admin/user-update', data)
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
                            <label htmlFor="user_id" className="ml-1 ">아이디</label>
                            <input id="user_id" disabled={true} value={editData.user_id} className="border p-1 rounded-2xl"/>
                            <label htmlFor="password" className="ml-1 ">비밀번호</label>
                            <input id="password" onChange={handlerPassword} value={password} className="border p-1 rounded-2xl"/>
                            <label htmlFor="nickname" className="ml-1 ">닉네임</label>
                            <input id="nickname" onChange={handlerNickname} value={nickname} className="border p-1 rounded-2xl"/>
                            <label htmlFor="age" className="ml-1 ">나이</label>
                            <input id="age" onChange={handlerAge} type="number" value={age} className="border p-1 rounded-2xl"/>
                            <label htmlFor="cash" className="ml-1 ">보유 현금액</label>
                            <input id="cash" onChange={handlerCash} value={cash} className="border p-1 rounded-2xl"/>
                            <button onClick={updateUser} className="mt-4 p-2 bg-emerald-300 font-bold">수정하기</button>
                        </div>
                    ): <></>
                }
            </div>
        </div>
    )
}

export default UserUpdateModal;