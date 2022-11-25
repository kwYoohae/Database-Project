import React from "react";

const Comment = ({data, key}) => {
    return(
        <div className="w-96 shadow-xl rounded-2xl bg-white my-3 p-2" key={key} style={{height:"auto"}}>
            <p className="">👀 {data.nickname}</p>
            <p className="text-gray-600 text-sm">{data.content}</p>
        </div>
    )
}

export default Comment;