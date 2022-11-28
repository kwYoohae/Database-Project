import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const UpdateBox = ({data, board_id}) => {
    const selectList = ["게시물 구분을 선택해주세요", "공지사항", "자유게시판", "종목토론방"]
    const [title, setTitle] = useState(data.board[0].title);
    const [content, setContent] = useState(data.board[0].content);
    const [board_type, setBoardType] = useState(data.board[0].board_type);

    const navigate = useNavigate();

    const handleSelect = (e) => {
        setBoardType(e.target.value);
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleContent = (e) => {
        setContent(e.target.value);
    }

    const updatePost = (e) => {
        if (board_type.includes("게시물 구분을 선택해주세요") || board_type.trim().length === 0) {
            alert("게시물 구분을 제대로 선택해주세요!!");
            return;
        }

        if (title.trim().length === 0) {
            alert("제목을 입력하셔야 합니다!!");
            return;
        }

        if (content.trim().length === 0) {
            alert("내용을 입력하셔야 합니다!!");
            return;
        }

        if (board_type === "공지사항" && JSON.parse(sessionStorage.getItem("user")).user_id !== 'admin') {
            alert("공지사항은 운영자만 쓸 수 있습니다.");
            return;
        }
        const user_id = JSON.parse(sessionStorage.getItem("user")).user_id;
        const req_data = {
            user_id: user_id,
            title: title,
            content: content,
            board_type: board_type,
            board_id: board_id
        };
        if (user_id === data.board[0].user_id || user_id === 'admin') {
            axios.post("http://localhost:3001/update",req_data)
                .then((res) => {
                    if(res.data.success === false) {
                        alert('게시물 생성에 실패하였습니다.');
                    }
                    else if (res.data.success === true) {
                        alert('게시물 생성에 성공하였습니다.');
                        navigate('/community');
                    }
                });
        } else {
            alert('권한이 있는 사용자만 가능합니다.');
            navigate(-1);
        }
    }

    return (
        <div className="border mt-20 shadow-2xl drop-shadow-md rounded-2xl bg-gray-50"
             style={{height: "680px", width: "700px"}}>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <span
                        className="col-start-4 col-span-3 mt-5 bg-emerald-400 py-2 px-4 text-center text-center rounded-2xl font-bold">게시글 수정</span>
                </div>
                <div className="shadow-lg drop-shadow-md rounded-2xl border mx-10 mt-5">
                    <select className="block mx-auto mt-4 p-2 rounded-2xl" value={board_type} onChange={handleSelect}>
                        {selectList.map((item) => {
                            return(
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                    <div className="flex justify-center flex-col">
                        <input className="flex pl-2 py-2 rounded-2xl pr-30 mx-10 mt-3" value={title} onChange={handleTitle} placeholder="게시물 제목을 입력해주세요"/>
                        <textarea className="flex mt-6 mx-10 h-96 p-2 rounded-2xl" value={content} onChange={handleContent} placeholder="내용을 입력해주세요"/>
                    </div>
                    <button onClick={updatePost} className="bg-blue-400 px-4 py-2 my-2 font-bold rounded-2xl text-center mx-auto block text-gray-50 ">수정하기</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateBox;