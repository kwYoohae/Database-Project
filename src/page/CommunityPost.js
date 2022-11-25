import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../component/Header";
import WriteBox from "../component/community/WriteBox";
import PostDetail from "../component/community/post/PostDetail";
import axios from "axios";

const CommunityPost = () => {
    const navigate = useNavigate();
    const {boardId} = useParams();
    const [data, setData] = useState(undefined);

    useEffect(() => {
        if(!sessionStorage.getItem("user"))
            navigate("/login");
        const req = {board_id: parseInt(boardId)};
        const url = 'http://localhost:3001/view/' +boardId;
        console.log(url);
        axios.get(url);
        axios.post('http://localhost:3001/post',req)
            .then((res) => {
                if (res.data.success === true) {
                    // console.log(res.data);
                    setData(res.data);
                    console.log(res.data);
                } else {
                    alert('게시물을 불러오는데 실패했습니다.');
                    navigate(-1);
                }
            });
    },[]);

    return(
        <div>
            <Header />
            <div className="flex flex-row justify-center overscroll-y-auto">
                <PostDetail data={data} board_id={boardId}/>
            </div>
        </div>
    )
}

export default CommunityPost;