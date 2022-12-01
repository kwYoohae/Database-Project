import React from "react";
import {Link} from "react-router-dom";

const HotPostDetail = ({data, index}) => {

    const makePost = () => {
        if (index === 0) {
            return (<div className="my-2" key={index}>
                <Link to={`/community/${data.board_id}`} className="ml-10">🥇 {data.title}</Link>
            </div>)
        } else if (index === 1) {
            return (<div className="my-2" key={index}>
                <Link to={`/community/${data.board_id}`} className="ml-10">🥈 {data.title}</Link>
            </div>)
        } else if (index === 2) {
            return (<div className="my-2" key={index}>
                <Link to={`/community/${data.board_id}`} className="ml-10">🥉 {data.title}</Link>
            </div>)
        }
    }

    return(
        <>
            {
                makePost()
            }
        </>
    )

}

export default HotPostDetail;