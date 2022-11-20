import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer
} from 'recharts';
const StockChart = ({data}) => {
    return(
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 50,
                    left: 20,
                    bottom: 55,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis type="number" domain={['dataMin - 5000', 'dataMax + 5000']} unit="원"/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="주가" stroke="#059669" />
            </LineChart>
        </ResponsiveContainer>
    )
};

export default StockChart;

