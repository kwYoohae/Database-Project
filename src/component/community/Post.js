import React from "react";
import {Link} from "react-router-dom";

const Post = ({key, list}) => {

    const checkBoardType = (data) => {
        if (data === '공지사항') {
            return <span className="text-red-500">공지사항을</span>;
        } else if (data === '종목토론방') {
            return "종목 토론방에";
        } else if (data === '자유게시판') {
            return "자유 게시판에";
        }
    }

    return (
        <div className="w-96 shadow-xl rounded-2xl bg-white my-3 p-2" key={key} style={{height: "100px"}}>
            <Link to={"/community/"+list.board_id}>
                <p className="text-sm">🥑{list.nickname}<span
                    className="text-gray-400 text-sm">님이 {checkBoardType(list.board_type)} 작성했습니다.</span></p>
                <p className="text-md truncate ...">{list.title}</p>
                <p className="text-sm text-gray-600 truncate ...">{list.content}</p>
            </Link>
            <span className="text-xs bg-gray-100 drop-shadow-md rounded-2xl p-1">👍 {list.post_like}</span>
            <span className="ml-2 text-xs bg-gray-100 drop-shadow-md rounded-2xl p-1">👀 {list.view}</span>
        </div>
    )
}

export default Post;