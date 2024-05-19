import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import { axiosClient } from '../../api/axios';

const AgeDistributionChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosClient.get('/api/candidates/age-distribution')
            .then(response => {
                const formattedData = [
                    { name: 'Under 35', value: response.data['Under 35'] },
                    { name: '35-45', value: response.data['35-45'] },
                    { name: '45-55', value: response.data['45-55'] },
                    { name: '+55', value: response.data['+55'] }
                ];
                setData(formattedData);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
                <LabelList dataKey="value" position="top" formatter={(value) => `${value}%`} />
            </Bar>
        </BarChart>
    );
};

export default AgeDistributionChart;
