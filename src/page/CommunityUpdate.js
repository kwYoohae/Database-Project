import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../component/Header";
import UpdateBox from "../component/community/UpdateBox";
import axios from "axios";

const CommunityUpdate = () => {
    const navigate = useNavigate();
    const {board_id} = useParams();
    const [data, setData] = useState(undefined);

    useEffect(() => {
        if(!sessionStorage.getItem("user"))
            navigate("/login");
        const req = {board_id: parseInt(board_id)};
        axios.post(process.env.REACT_APP_BACKEND_SERVER+'/post', req)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
                if (res.data.success === false) {
                    alert('게시물 로딩에 실패하였습니다.');
                    navigate(-1);
                }
            })

    },[])

    return(
        <div>
            <Header />
            <div className="flex flex-row justify-center overscroll-y-auto">
                {
                    !data ? <></> : data.board.length > 0 ? <UpdateBox data={data} board_id={board_id}/> : <></>
                }
            </div>
        </div>
    )
}

export default CommunityUpdate;