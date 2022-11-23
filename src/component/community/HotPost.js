import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

const HotPost = () => {

    const [temp, setTemp] = useState();

    useEffect(() => {
        axios.get('api')
            .then((res) => {
                console.log(res.data);
                setTemp(res.data.temp);
            })
    },[])

    return(
        <div className="flex flex-col ml-20 mt-20">
            <div className="border shadow-md drop-shadow-md rounded-xl" style={{height:"400px", width:"390px"}}>

            </div>
            <span className="text-center border shadow-md drop-shadow-md mt-4 px-2 py-4 rounded-xl">
                🏊‍🏊‍오늘 한강 수온은 {temp}도 입니다🏊‍🏊‍
            </span>
        </div>
    )
}

export default HotPost;