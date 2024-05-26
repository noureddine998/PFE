import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { axiosClient } from '../../api/axios';

const SeatsWonByPartyChart = () => {
    const [chartData, setChartData] = useState([]);

    const partyAbbreviations = {
        "Front des Forces Démocratiques (FFD)": "FFD",
        "Mouvement Populaire (MP)": "MP",
        "Parti Authenticité et Modernité (PAM)": "PAM",
        "Parti de l'Istiqlal (PI)": "PI",
        "Parti de la Justice et du Développement (PJD)": "PJD",
        "Parti du Progrès et du Socialisme (PPS)": "PPS",
        "Rassemblement National des Indépendants (RNI)": "RNI",
        "Union Constitutionnelle (UC)": "UC",
        "Union Socialiste des Forces Populaires (USFP)": "USFP",
        "Fédération de la Gauche Démocratique (FGD)": "FGD"
    };

    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/api/candidates/seats-won-by-party');
            setChartData(response.data.map(item => ({
                name: partyAbbreviations[item.party] || item.party,
                value: Number(item.totalSeats)
            })));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={chartData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default SeatsWonByPartyChart;
