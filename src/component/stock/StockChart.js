import React from 'react';
import {
    AreaChart,
    LineChart,
    Line,
    Area,
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
            <AreaChart
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
                <defs>
                    <linearGradient id="color-stock" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name"/>
                <YAxis type="number" domain={['dataMin - 3000', 'dataMax + 3000']} unit="원"/>
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="주가" stroke="#059669" fillOpacity={0.5} fill="url(#color-stock)"/>
            </AreaChart>
        </ResponsiveContainer>
    )
};

export default StockChart;

