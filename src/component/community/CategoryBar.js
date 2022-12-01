import React, {useEffect} from "react";
import {Link, useSearchParams} from "react-router-dom";

const CategoryBar = ({filterPost}) => {
    const [searchParams] = useSearchParams();
    const queryList = searchParams.get('board');

    useEffect(() => {
        let wholePost = document.getElementById("whole-post");
        let note = document.getElementById("note");
        let stockPost = document.getElementById("stock-post");
        let post = document.getElementById("post");

        if (queryList === 'note') {
            wholePost.style.color = "black";
            note.style.color = "white";
            stockPost.style.color = "black";
            post.style.color = "black";
        } else if (queryList === 'stock-post') {
            wholePost.style.color = "black";
            note.style.color = "black";
            stockPost.style.color = "white";
            post.style.color = "black";
        } else if (queryList === 'post') {
            wholePost.style.color = "black";
            note.style.color = "black";
            stockPost.style.color = "black";
            post.style.color = "white";
        } else {
            wholePost.style.color = "white";
            note.style.color = "black";
            stockPost.style.color = "black";
            post.style.color = "black";
        }
    })

    return (
        <div className="flex justify-center col-start-3 col-span-5">
            <div className="bg-emerald-500 font-bold shadow-xl text-white gap-4 grid grid-cols-4 p-2 rounded-2xl">
                <div id="whole-post" className="col-start-1" onClick={filterPost}><Link to="/community">전체 게시판</Link></div>
                <div id="note" className="col-start-2" onClick={filterPost}><Link to="/community?board=note">공지사항</Link></div>
                <div id="stock-post" className="col-start-3" onClick={filterPost}><Link to="/community?board=stock-post">종목 토론방</Link></div>
                <div id="post" className="col-start-4" onClick={filterPost}><Link to="/community?board=post">자유 게시판</Link></div>
            </div>
        </div>
    )
}

export default CategoryBar;