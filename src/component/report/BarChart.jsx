// components/RevenueChart.js
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const RevenueChart = ({ data }) => {
    const [showDataLabels, setShowDataLabels] = useState(false);

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
                backgroundColor: 'rgb(83, 255, 255)',
            },
            {
                label: 'Sửa chữa',
                data: sortedLabels.map(label => suachuaData[label] || 0),
                borderColor: 'rgb(255, 83, 83)',
                backgroundColor: 'rgb(255, 83, 83)',
            },
            {
                label: 'Tổng doanh thu',
                data: sortedLabels.map(label => tongthuData[label] || 0),
                borderColor: 'green',
                backgroundColor: 'green',
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

    return (
        <div>
            <button style={{ width: '80px', cursor: 'pointer' }} onClick={toggleDataLabels}>
                {showDataLabels ? 'Ẩn ' : 'Hiện '}
            </button>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default RevenueChart;
