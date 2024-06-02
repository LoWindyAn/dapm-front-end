// components/StatisticsTable.js
import React, { useState } from 'react';
import styles from './table.module.css';

const StatisticsTable = ({ data }) => {
    const [selectedYear, setSelectedYear] = useState('');

    // Extract unique years from the data
    const years = Array.from(new Set(data.map(item => item.Nam)));

    // Handle year selection
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Filter data by selected year
    const filteredData = selectedYear ? data.filter(item => item.Nam.toString() === selectedYear) : data;

    // Sort data by year and month
    const sortedData = [...filteredData].sort((a, b) => {
        const dateA = new Date(a.Nam, a.Thang - 1);
        const dateB = new Date(b.Nam, b.Thang - 1);
        return dateA - dateB;
    });

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <label htmlFor="year-select">Lọc theo năm:</label>
                <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                    <option value="">Tất cả</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Loại Linh Kiện</th>
                        <th>Năm</th>
                        <th>Tháng</th>
                        <th>Số Lượng Bán Ra</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.TenLoai}</td>
                            <td>{item.Nam}</td>
                            <td>{item.Thang}</td>
                            <td>{item.SoLuongBanRa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatisticsTable;
