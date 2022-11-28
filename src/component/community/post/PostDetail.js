import React, {useEffect, useState} from 'react';
import Comment from "./Comment";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";

const PostDetail = ({board_id, data}) => {

    const [board, setBoard] = useState();
    const [comment, setComment] = useState();
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();

    const handlerComment = (e) => {
        setNewComment(e.target.value);
    }

    const writeComment = (e) => {

        if (newComment.trim().length === 0) {
            alert('내용을 입력해주세요');
            return;
        }

        const reqComment = {
            user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
            board_id: board_id,
            comment: newComment
        };

        axios.post('http://localhost:3001/comment',reqComment)
            .then((res) => {
               if (res.data.success === true) {
                   alert('댓글 작성에 성공했습니다.');
                   window.location.reload();
               } else {
                   alert('댓글 작성에 실패하셨습니다.');
                   navigate(-1);
               }
            });
    }

    const updateHandler = () => {
        const url = '/community/update/' + board_id;
        navigate(url);
    }

    const deletePost = () => {
        const user_id = JSON.parse(sessionStorage.getItem("user")).user_id;
        if (user_id === 'admin' || user_id === data.board[0].user_id) {
            axios.delete('http://localhost:3001/delete-post', {data:{board_id:board_id, user_id:user_id}})
                .then((res) => {
                    if (res.data.success === true) {
                        alert('성공적으로 삭제되었습니다. ')
                        navigate(-1);
                    } else {
                        alert('삭제가 실패했습니다.')
                    }
                })
        } else {
            alert('작성자만 삭제를 하실 수 있습니다.');
        }
    }

    return(
        <div className="border mt-20 shadow-2xl drop-shadow-md rounded-2xl bg-gray-50 mb-10"
             style={{height: "680px", width: "700px", overflow: "scroll"}}>
            {
                data === undefined || data.success === false ? <div>정보가 없습니다.</div> :
                   (
                        <div className="ml-10 mr-10" key={data.board[0].board_id}>
                            <div className="flex flex-row-reverse mt-5">
                                <button onClick={deletePost}><Delete className="mx-2"/></button>
                                <button onClick={updateHandler}><Edit/></button>
                            </div>
                            <p className="mt-5 text-left text-gray-600">{data.board[0].created_at.substring(0, 10)}</p>
                            <p className="mt-2 text-left text-gray-600">📕 {data.board[0].nickname}</p>
                            <p className="text-left text-xl font-bold">{data.board[0].title}</p>
                            <p className="mt-5">
                                {data.board[0].content}
                            </p>
                            <input onChange={handlerComment} className="mt-10 border rounded-2xl w-96 py-2 pl-3" placeholder="댓글을 입력해주세요" />
                            <button onClick={writeComment} className="ml-5 border py-2 px-5 rounded-2xl bg-emerald-200 font-medium">작성하기</button>
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