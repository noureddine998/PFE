import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { axiosClient } from '../../api/axios';

const VotingPercentageChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosClient.get('/api/voting-percentage')
            .then(response => {
                const votingPercentage = response.data['Voting Percentage'];
                setData([
                    { name: 'Voté', value: votingPercentage },
                    { name: 'n\'a pas voté', value: 100 - votingPercentage }
                ]);
            })
            .catch(error => console.log(error));
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default VotingPercentageChart;
