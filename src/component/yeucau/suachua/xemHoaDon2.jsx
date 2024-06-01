import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Styles from './xemHoaDon2.module.css'
import { FaFileExport, FaPlus, FaSave } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import axios from 'axios'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import num2words from 'vn-num2words';

const XemHoaDon = (props) => {
    const { khachhang, setDisplay, setIsSubmit, ahoadon, dichvu, linhkien } = props
    const [hoadon, setHoadon] = useState({})
    const [dslinhkien, setDsLinhkien] = useState([])
    const [lkien, setLkien] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        const getUser = () => {
            return JSON.parse(localStorage.getItem('user'));
        }
        const userr = getUser()

        if (userr) {
            setUser(userr)
        }
    }, []);

    const pdfRef = useRef();

    const handleDate = () => {
        const date = new Date();
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const formatter = new Intl.DateTimeFormat('vi-VN', options);
        const parts = formatter.formatToParts(date);

        let day, month, year;
        parts.forEach(part => {
            if (part.type === 'day') day = part.value;
            if (part.type === 'month') month = part.value;
            if (part.type === 'year') year = part.value;
        });

        const vietnamTime = `Ngày ${day} ${month} năm ${year}`;
        return vietnamTime
    };
    const datetime = handleDate()

    useEffect(() => {
        const fetchDsLinhkien = async () => {
            const res = await axios.get(`http://localhost:3500/bill/repair/dslinhkien?MaHD=${ahoadon.MaHD}`)
            setDsLinhkien(res.data)
        }
        setLkien(linhkien)
        fetchDsLinhkien()
    }, [ahoadon])

    useEffect(() => {
        setHoadon(ahoadon)
    }, [ahoadon])


    const handleCancel = () => {
        setDisplay(false)
    }


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
            pdf.save(`hoa-don-${hoadon.MaHD}.pdf`);
        });
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         exportToPdf()
    //         handleCancel()
    //     }, 200)

    // }, [])

    return (
        <>
            <div className={Styles.abc} style={{ overflowY: "scroll" }}>
                <div className={Styles.container} ref={pdfRef}>
                    <div className={Styles.headerHD}>
                        <div style={{ width: '100px' }}>

                        </div>
                        <div className={Styles.titleHD}>
                            <h2 style={{ fontWeight: "bold", fontSize: '20px' }}>HÓA ĐƠN GIÁ TRỊ GIA TĂNG</h2>
                            <p style={{ fontWeight: "600", fontStyle: 'italic' }}>&#10088;VAT INVOICE&#10089;</p>
                            <p style={{ fontWeight: "600", fontStyle: 'italic' }}>&#10088;Bản thể hiện của hóa đơn điện tử&#10089;</p>
                            <p style={{ fontStyle: 'italic' }}>&#10088;E-Invoice viewer&#10089;</p>
                            <p style={{ fontStyle: 'italic', fontWeight: "600", marginTop: '4px' }}>{datetime}</p>
                        </div>
                        <div className={Styles.rightTitle}>
                            <p style={{ fontWeight: "600" }}>Mẫu số <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Form&#10089;</span>: <span> 01GTKT0/001</span></p>
                            <p style={{ fontWeight: "600" }}>Ký hiệu <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Serial No&#10089;</span>: <span> AA/20E</span></p>
                            <p style={{ fontWeight: "600" }}>Số <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;No&#10089;</span>: <span style={{ color: 'red' }}>0000000</span></p>
                        </div>
                    </div>
                    <div className={Styles.inforCompany}>
                        <h2 style={{ fontWeight: "bold", fontSize: '16px' }}>CÔNG TY TRÁCH NHIỆM HỮU HẠN DANACOMPANY</h2>
                        <p style={{ fontWeight: "500" }}>Mã số thuế <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Tax code&#10089;</span>: 8888888888</p>
                        <p style={{ fontWeight: "500" }}>Địa chỉ <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Address&#10089;</span>: 48 Cao Thắng, Thanh Bình, Hải Châu, Đà Nẵng</p>
                        <p style={{ fontWeight: "500" }}>Điện thoại <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Tel&#10089;</span>: 0855885558</p>
                        <p style={{ fontWeight: "500" }}>Số tài khoản <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088; A/C &#10089;</span>: </p>
                    </div>
                    <div className={Styles.BoxInforKH}>
                        <div className={Styles.informationKH}>
                            {/* <h2 style={{ fontWeight: "bold", fontSize: '16px' }}>CÔNG TY TRÁCH NHIỆM HỮU HẠN DANACOMPANY</h2> */}
                            <p style={{ fontWeight: "500" }}>Họ tên người mua hàng <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Buyer&#10089;</span>: {hoadon.TenKH}</p>
                            <p style={{ fontWeight: "500" }}>Tên đơn vị <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Co_name&#10089;</span>:</p>
                            <p style={{ fontWeight: "500" }}>Địa chỉ <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Address&#10089;</span>: {hoadon.DiaChi}</p>
                            <p style={{ fontWeight: "500" }}>Hình thức thanh toán <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088; Pay method &#10089;</span>: </p>
                        </div>
                        <div className={Styles.informationKH}>
                            <p style={{ fontWeight: "500" }}>Mã khách hàng <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Customer code&#10089;</span>: {hoadon.MaKH}</p>
                            <p style={{ fontWeight: "500" }}>Số điện thoại <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Phone Number&#10089;</span>: {hoadon.SDT}</p>
                            <p style={{ fontWeight: "500" }}>Mã số thuế <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088;Tax code&#10089;</span>: </p>
                            <p style={{ fontWeight: "500" }}>Số tài khoản <span style={{ fontStyle: 'italic', fontWeight: "400" }}>&#10088; A/C &#10089;</span>: </p>
                        </div>
                    </div>
                    <div className={Styles.information}>
                        <div className={Styles.linhkienthay}>
                            <table>
                                <thead>
                                    <tr className={Styles.header}>
                                        <th style={{ width: '40px' }}>STT</th>
                                        <th>Tên dịch vụ, hàng hóa</th>
                                        <th>Mã số</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dslinhkien && dslinhkien.map((linhkien1, stt) => (
                                        <tr key={stt}>
                                            <td style={{ width: '40px' }}>{stt + 1}</td>
                                            <td style={{ width: '500px' }}>
                                                {lkien.find(item => item.MaSP == linhkien1.MaSP).TenSP}
                                            </td>
                                            <td style={{ width: '100px' }}>
                                                {lkien.find(item => item.MaSP == linhkien1.MaSP).MaSP}
                                            </td>
                                            <td > {linhkien1.SoLuong} </td>
                                            <td >
                                                {lkien.find(item => item.MaSP == linhkien1.MaSP).DonGia}
                                            </td>
                                            <td >
                                                {lkien.find(item => item.MaSP == linhkien1.MaSP).DonGia * linhkien1.SoLuong}.00
                                            </td>
                                        </tr>
                                    ))}
                                    {
                                        <tr>
                                            <td style={{ width: '40px' }}>{dslinhkien.length + 1}</td>
                                            <td style={{ width: '500px' }}>
                                                {dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua) && dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua).TenSC}
                                            </td>
                                            <td style={{ width: '100px' }}>
                                                {dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua) && dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua).MaSuaChua}
                                            </td>
                                            <td > 1 </td>
                                            <td >
                                                {dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua) && dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua).PhiSua}
                                            </td>
                                            <td >
                                                {dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua) && dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua).PhiSua}
                                            </td>
                                        </tr>
                                    }

                                    <tr className={Styles.total}>
                                        <td colSpan={5} style={{ textAlign: 'end', paddingRight: '24px' }}>Cộng tiền hàng hóa, dịch vụ:</td>
                                        <td>{hoadon.TongTien}đ</td>
                                    </tr>
                                    <tr className={Styles.total}>
                                        <td colSpan={5} style={{ paddingRight: '24px', paddingLeft: '24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p style={{ display: 'block' }}>Thuế xuất GTGT: 5%</p>
                                                <p>Tiền thuế GTGT: </p>
                                            </div>
                                        </td>
                                        <td>{hoadon.TongTien * 0.05}.00đ</td>
                                    </tr>
                                    <tr className={Styles.total}>
                                        <td colSpan={5} style={{ textAlign: 'end', paddingRight: '24px' }}>Tổng tiền thanh toán:</td>
                                        <td>{Number(hoadon.TongTien * 1.05)}.00đ</td>
                                    </tr>
                                    <tr className={Styles.total}>
                                        <td colSpan={6} style={{ textAlign: 'end', paddingRight: '24px' }}> Số tiền bằng chữ:{Number(hoadon.TongTien * 1.05) && num2words(Number(hoadon.TongTien * 1.05))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={Styles.signature}>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>Người mua hàng</p>
                            <p style={{ fontStyle: 'italic' }}>&#10088;Ký, ghi rõ họ tên&#10089;</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>Người lập hóa đơn & thanh toán</p>
                            <p style={{ fontStyle: 'italic' }}>&#10088;Ký, ghi rõ họ tên&#10089;</p>
                            <p>{user.HoVaTen}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Styles.btn}>
                <button className={Styles.btnCancel} onClick={handleCancel}>Thoát</button>
                <button className={Styles.btnAdd} onClick={exportToPdf}><FaFileExport />Xuất PDF</button>
            </div>
        </>
    )
}

export default XemHoaDon