import React, {useState} from "react";
import {Delete, Edit} from "@mui/icons-material";
import axios from "axios";

const UserInfoDetail = ({user, key, setModal, modal, setEditData, editData}) => {

    const deleteUser = (user_id) => {
        axios.delete(process.env.REACT_APP_BACKEND_SERVER+'/admin/user-delete',{data: {delete_id:user_id, user_id:JSON.parse(sessionStorage.getItem("user")).user_id}})
            .then((res) => {
                if (res.data.success === true) {
                    alert('성공적으로 삭제되었습니다. ')
                    window.location.reload();
                } else {
                    alert('삭제가 실패했습니다.')
                }
            })
    }

    const changeModal = () => {
        setEditData(user);
        setModal(!modal);
    }

    return(
        <tr className="text-sm" key={key}>
            <td>{user.user_id}</td>
            <td>{user.password}</td>
            <td>{user.nickname}</td>
            <td>{user.age}</td>
            <td>{user.created_at.substring(0,10)}</td>
            <td>{user.cash.toLocaleString("ko-KR")}</td>
            <td><button onClick={changeModal}><Edit/></button></td>
            <td><button onClick={() => deleteUser(user.user_id)}><Delete/></button></td>
        </tr>
    )
}

export default UserInfoDetail;