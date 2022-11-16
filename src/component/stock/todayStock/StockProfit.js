import React from "react"

const stockProfit = ({stockProfit}) => {

    return (
        <>
            {stockProfit >= 0 ?
                <span className="mx-2 p-2 bg-red-300 rounded-xl text-red-600">📈 +{stockProfit}%</span>
                :
                <span className="mx-2 p-2 bg-blue-300 rounded-xl text-blue-600">📉 {stockProfit}%</span>
            }
        </>
    );
}

export default stockProfit;