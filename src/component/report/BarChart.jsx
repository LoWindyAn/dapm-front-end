// components/RevenueChart.js
import { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Styles from './chart.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, ChartDataLabels);

const RevenueChart = ({ data }) => {
    const [showDataLabels, setShowDataLabels] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('');

    const lapdatData = {};
    const suachuaData = {};
    const tongthuData = {};
    const labels = new Set();

    const lapdatArray = Array.isArray(data.lapdat) ? data.lapdat : [];
    const suachuaArray = Array.isArray(data.suachua) ? data.suachua : [];
    const tongthuArray = Array.isArray(data.tongthu) ? data.tongthu : [];

    lapdatArray.forEach(item => {
        const label = `${item.Thang}/${item.Nam}`;
        labels.add(label);
        lapdatData[label] = parseFloat(item.DoanhThu);
    });

    suachuaArray.forEach(item => {
        const label = `${item.Thang}/${item.Nam}`;
        labels.add(label);
        suachuaData[label] = parseFloat(item.DoanhThu);
    });

    tongthuArray.forEach(item => {
        const label = `${item.Thang}/${item.Nam}`;
        labels.add(label);
        tongthuData[label] = parseFloat(item.DoanhThu);
    });

    // Convert labels set to an array and sort it
    const sortedLabels = Array.from(labels).sort((a, b) => {
        const [monthA, yearA] = a.split('/').map(Number);
        const [monthB, yearB] = b.split('/').map(Number);
        return yearA - yearB || monthA - monthB;
    });

    const chartData = {
        labels: sortedLabels,
        datasets: [
            {
                label: 'Lắp đặt',
                data: sortedLabels.map(label => lapdatData[label] || 0),
                borderColor: 'rgb(83, 255, 255)',
                backgroundColor: 'rgba(83, 255, 255, 0.5)',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Sửa chữa',
                data: sortedLabels.map(label => suachuaData[label] || 0),
                borderColor: 'rgb(255, 83, 83)',
                backgroundColor: 'rgba(255, 83, 83, 0.5)',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Tổng doanh thu',
                data: sortedLabels.map(label => tongthuData[label] || 0),
                borderColor: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.5)',
                fill: false,
                tension: 0.1
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Doanh thu theo tháng',
            },
            datalabels: {
                display: showDataLabels,
                anchor: 'end',
                align: 'top',
                formatter: (value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                color: 'black',
                font: {
                    weight: 'bold'
                }
            }
        },
    };

    const toggleDataLabels = () => {
        setShowDataLabels(prevShowDataLabels => !prevShowDataLabels);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const lapdatRevenueForSelectedMonth = selectedMonth ? lapdatData[selectedMonth] || 0 : 0;
    const suachuaRevenueForSelectedMonth = selectedMonth ? suachuaData[selectedMonth] || 0 : 0;

    const pieData = {
        labels: ['Lắp đặt', 'Sửa chữa'],
        datasets: [
            {
                data: [lapdatRevenueForSelectedMonth, suachuaRevenueForSelectedMonth],
                backgroundColor: ['rgb(83, 255, 255)', 'rgb(255, 83, 83)'],
                hoverBackgroundColor: ['rgb(83, 255, 255, 0.8)', 'rgb(255, 83, 83, 0.8)'],
            }
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: `Tỷ lệ doanh thu cho tháng ${selectedMonth}`,
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return percentage;
                },
                color: 'black',
                font: {
                    weight: 'bold'
                }
            }
        },
    };

    return (
        <div className={Styles.container}>
            <div className={Styles.pieChart}>
                <div>
                    <label htmlFor="month-select">Chọn tháng:</label>
                    <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="">--Chọn tháng--</option>
                        {sortedLabels.map((label) => (
                            <option key={label} value={label}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedMonth && <Pie data={pieData} options={pieOptions} />}
            </div>
            <div className={Styles.barchart}>
                <button onClick={toggleDataLabels}>
                    {showDataLabels ? 'Ẩn số doanh thu' : 'Hiện số doanh thu'}
                </button>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default RevenueChart;
