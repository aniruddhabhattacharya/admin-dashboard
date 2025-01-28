import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./css/Graph.css";
import { useAppSelector } from '../redux/hooks.ts';

function Graph() {
    const dashBoardInfo = useAppSelector((state) => state.dashBoard);
    const [data, setData] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState("used");

    const inventoryDataReady = () => {
        const newItems = dashBoardInfo.filter(item => item.condition === selectedCondition);
        const groupedByDate = newItems.reduce((acc, item) => {
            const date = item.timestamp.split(' ')[0]; 
            const formattedDate = new Date(date);
            const formattedDateStr = `${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}/${formattedDate.getDate().toString().padStart(2, '0')}/${formattedDate.getFullYear().toString().slice(-2)}`;
            if (!acc[formattedDateStr]) {
                acc[formattedDateStr] = 1;
            } else {
                acc[formattedDateStr]++;
            }
            return acc;
        }, {});

        const result = Object.keys(groupedByDate).map(date => ({
            date: date,
            count: groupedByDate[date]
        }));
        return result;
    };

    useEffect(() => {
        setData(inventoryDataReady());
        console.log("data", data);
    }, [dashBoardInfo, selectedCondition]);

    const handleButtonClick = (condition) => {
        setSelectedCondition(condition);
    };

    const getButtonClass = (condition) => {
        return selectedCondition === condition ? 'btn-orange active' : 'btn-orange';
    };

    return (
        <div className='graph-view'>
            <div>
                <div className="heading-view-graih">
                    <h6 className='heading-grph'>Inventory Count</h6>
                    <button className={getButtonClass('new')} onClick={() => handleButtonClick('new')}>New</button>
                    <button className={getButtonClass('used')} onClick={() => handleButtonClick('used')}>Used</button>
                    <button className={getButtonClass('cpo')} onClick={() => handleButtonClick('cpo')}>CPO</button>
                </div>
                
                <div className="graph-container" style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f7931e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Graph;
