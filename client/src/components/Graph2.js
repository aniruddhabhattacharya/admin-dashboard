import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./css/Graph.css";
import { useAppSelector } from '../redux/hooks.ts';

function Graph() {
    const dashBoardInfo = useAppSelector((state) => state.dashBoard);
    const [selectedCondition, setSelectedCondition] = useState("new");

    // Use useMemo to avoid recalculating on each render
    const inventoryDataReady = useMemo(() => {
        // Filter the items based on the selected condition
        const newItems = dashBoardInfo.filter(item => item.condition === selectedCondition);

        // Group items by date and calculate the total price and count for each date
        const groupedByDate = newItems.reduce((acc, item) => {
            const date = item.timestamp.split(' ')[0];  // Extract date part from timestamp
            const formattedDate = new Date(date);
            const formattedDateStr = `${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}/${formattedDate.getDate().toString().padStart(2, '0')}/${formattedDate.getFullYear().toString().slice(-2)}`;

            // Parse the price as a number and remove the 'USD' string
            const price = parseFloat(item.price.replace(' USD', ''));

            if (!acc[formattedDateStr]) {
                acc[formattedDateStr] = { total: 0, count: 0 };
            }

            // Accumulate the total price and increment the count
            acc[formattedDateStr].total += price;
            acc[formattedDateStr].count++;

            return acc;
        }, {});

        // Calculate the average MSRP for each date
        return Object.keys(groupedByDate).map(date => ({
            date: date,
            avg_msrp: groupedByDate[date].total / groupedByDate[date].count
        }));
    }, [dashBoardInfo, selectedCondition]); // Recompute when dashBoardInfo or selectedCondition changes

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
                    <h6 className='heading-grph'>Average MSRP in USD</h6>
                    <button className={getButtonClass('new')} onClick={() => handleButtonClick('new')}>New</button>
                    <button className={getButtonClass('used')} onClick={() => handleButtonClick('used')}>Used</button>
                    <button className={getButtonClass('cpo')} onClick={() => handleButtonClick('cpo')}>CPO</button>
                </div>

                <div className="graph-container" style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={inventoryDataReady} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="avg_msrp" fill="#f7931e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Graph;
