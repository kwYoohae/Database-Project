import React from "react";

const stockInfo = () => {
    return (
        <tr className="h-12">
            <td colSpan="4">
                <span className="bg-emerald-300 mx-4 text-white p-2 rounded-xl">005930</span>
                <span>삼성전자</span>
                <div className="float-right">
                    <span className="mx-2 p-2">57,500원</span>
                    <span className="mx-2 p-2 bg-red-300 rounded-xl text-red-600">📈 +56.6%</span>
                </div>
            </td>
        </tr>
    );
}

export default stockInfo;