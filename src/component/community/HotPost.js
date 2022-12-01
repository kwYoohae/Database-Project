import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import HotPostDetail from "./hot/HotPostDetail";

const HotPost = () => {

    const [temp, setTemp] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_SERVER+'/hot-post')
            .then((res) => {
                setData(res.data.data);
            })
        axios.get('api')
            .then((res) => {
                // console.log(res.data);
                setTemp(res.data.temp);
            });
    },[])

    return(
        <div className="flex flex-col ml-20 mt-20">
            <div className="border shadow-md drop-shadow-md rounded-xl" style={{height:"400px", width:"390px"}}>
                <div className="flex justify-center">
                    <span className="font-bold text-xl my-4">🔥오늘의 핫 게시물🔥</span>
                </div>
                <div className="flex flex-col">
                    {
                        data === undefined ? <></> :
                            data.map((res, index) => {
                                return(<HotPostDetail data={res} index={index}/>);
                            })
                    }
                </div>
            </div>
            <span className="text-center border shadow-md drop-shadow-md mt-4 px-2 py-4 rounded-xl">
                🏊‍🏊‍오늘 한강 수온은 {temp}도 입니다🏊‍🏊‍
            </span>
        </div>
    )
}

export default HotPost;