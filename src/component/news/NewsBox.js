import React from "react";
import NewsData from "./NewsData";

const NewsBox = ({news}) => {
    return(
        <div className="shadow-2xl border mt-20 mx-auto overscroll-y-auto" style={{width:"1350px", height:"360px"}}>
            <div className="text-center text-3xl font-bold mt-6">오늘의 뉴스</div>
            <table className="ml-10  text-left border-separate border-spacing-x-8 table-auto">
                <thead>
                    <tr>
                        <th>발행 날짜</th>
                        <th>뉴스 이름</th>
                    </tr>
                </thead>
                <tbody>
                {!news ? <tr><td>Undefined</td><td>데이터가 없습니다</td></tr>
                : news.map((data) => {
                    return(<NewsData news={data}/>);
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default NewsBox;