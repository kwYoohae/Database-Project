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
                setTemp(res.data.temp);
            });
    },[])

    return(
        <div className="flex flex-col ml-20 mt-20">
            <div className="border shadow-md drop-shadow-md rounded-xl" style={{height:"400px", width:"390px"}}>
                <div className="flex justify-center">
                    <span className="font-bold text-xl my-4">π₯μ€λμ ν« κ²μλ¬Όπ₯</span>
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
                βοΈβοΈμ€λ νκ° μμ¨μ {temp}λ μλλ€ββοΈβοΈ
            </span>
        </div>
    )
}

export default HotPost;