import React, {useEffect, useState} from 'react';
import Comment from "./Comment";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const PostDetail = ({board_id, data}) => {

    const [board, setBoard] = useState();
    const [comment, setComment] = useState();
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();

    const handlerComment = (e) => {
        setNewComment(e.target.value);
    }

    return(
        <div className="border mt-20 shadow-2xl drop-shadow-md rounded-2xl bg-gray-50"
             style={{height: "680px", width: "700px", overflow: "scroll"}}>
            {
                data === undefined || data.success === false ? <div>정보가 없습니다.</div> :
                   (
                        <div className="ml-10 mr-10">
                            <p className="mt-10 text-left text-gray-600">{data.board[0].created_at.substring(0, 10)}</p>
                            <p className="mt-2 text-left text-gray-600">📕 {data.board[0].nickname}</p>
                            <p className="text-left text-xl font-bold">{data.board[0].title}</p>
                            <p className="mt-5">
                                {data.board[0].content}
                            </p>
                            <input onChange={handlerComment} className="mt-10 border rounded-2xl py-2 pl-3 pr-64" placeholder="댓글을 입력해주세요" />
                            <button className="ml-5 border py-2 px-5 rounded-2xl bg-emerald-200 font-medium">작성하기</button>
                        </div>
                    )
            }
            <div className="ml-10 mt-5">
                {
                    data === undefined || data.success === false ? <></>
                        : data.comment.map((comment) => {
                            return (<Comment key={data.comment_id} data={comment}/>)
                        })
                }
            </div>
        </div>
    )
}

export default PostDetail;