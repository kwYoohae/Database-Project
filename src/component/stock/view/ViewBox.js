import React from "react";
import ViewData from "./ViewData";

const ViewBox = ({data}) => {
    return(
        <div className="border shadow-2xl drop-shadow-sm overflow-y-scroll" style={{width:"370px", height:"375px"}}>
            <div className="flex justify-center flex-col">
                <div className="mt-2 font-bold text-xl text-center">주식 검색량 급상승</div>
                <table className="border-separate border-spacing-2">
                    <tr>
                        <th>주식 명</th>
                        <th>검색량</th>
                    </tr>
                    {
                        data.length > 0 ? data.map((view, index) => {
                            return(<ViewData view={view} index={index}/>)
                        }) : <></>
                    }
                </table>
            </div>
        </div>
    )
}

export default ViewBox;