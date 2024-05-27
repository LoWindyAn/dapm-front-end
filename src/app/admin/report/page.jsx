'use client'

import { useEffect, useRef, useState } from 'react'
import Styles from './products.module.css'
import axios from 'axios'
import BarChart from '@/component/report/BarChart'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaFileExport } from 'react-icons/fa'

const Report = () => {
    const [data, setData] = useState([])
    const pdfRef = useRef();

    useEffect(() => {
        const fetchDoanhThu = async () => {
            // const res = await axios.get('http://localhost:3500/report/doanhthu')
            const res = await axios.get('http://localhost:3500/report/doanhthu1')

            setData(res.data)
        }
        fetchDoanhThu()
    }, [])

    const exportToPdf = () => {
        const input = pdfRef.current;
        html2canvas(input, {
            scrollX: 0,
            scrollY: 0,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Báo cáo.pdf`);
        });
    };

    return (
        <div className={Styles.BoxOut}>
            <div className={Styles.xuatpdf}>
                <button onClick={exportToPdf}><FaFileExport /> Xuất PDF</button>
            </div>
            <div className={Styles.container} ref={pdfRef}>
                <div className={Styles.title}>
                    <p >Báo cáo thống kê</p>
                </div>
                <div className={Styles.DoanhThu}>
                    <div>
                        <h1>Thống Kê Doanh Thu</h1>
                    </div>
                    <div className={Styles.Chart1}>
                        <BarChart data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report