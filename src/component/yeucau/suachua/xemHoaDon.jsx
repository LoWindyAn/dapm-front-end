import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Styles from './xemHoaDon.module.css'
import { FaFileExport, FaPlus, FaSave } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import axios from 'axios'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const XemHoaDon = (props) => {
    const { khachhang, setDisplay, setIsSubmit, ahoadon, dichvu, linhkien } = props
    const [hoadon, setHoadon] = useState({})
    const [dslinhkien, setDsLinhkien] = useState([])
    const [lkien, setLkien] = useState([])

    const pdfRef = useRef();


    const handleDate = () => {
        const date = new Date();
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const vietnamTime = new Intl.DateTimeFormat('vi-VN', options).format(date);
        return vietnamTime;
    }
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

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setHoadon({
            ...hoadon,
            [name]: value
        })
    }

    const handleChange = (e) => {

        setHoadon({
            ...hoadon,
            [e.target.name]: e.target.value
        })
    };


    const moreLinhkien = () => {
        setDsLinhkien(
            [...dslinhkien,
            {
                MaSP: linhkien[0].MaSP,
                SoLuong: 1
            }]
        )
    }

    const changeLinhKien = (e, Ma) => {
        const { value, name } = e.target
        if (name == 'MaSP') {
            const newDs = dslinhkien.map((item, index) => {
                return item.MaSP == Ma ? { ...item, 'MaSP': value } : item
            })
            setDsLinhkien(newDs)
        } else {
            const newDs = dslinhkien.map((item, index) => {
                return item.MaSP == Ma ? { ...item, 'SoLuong': value } : item
            })
            setDsLinhkien(newDs)
        }
    }

    const deleteLinhKien = (MaLK) => {
        const newDs = dslinhkien.filter(item => item.MaSP != MaLK)
        setDsLinhkien(newDs)
    }


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
                    <div className={Styles.title}>
                        <p>HÓA ĐƠN SỬA CHỮA</p>
                        <div className={Styles.mahd}>
                            <p>#{hoadon.MaHD}</p>
                            <p>{hoadon.NgayTao && hoadon.NgayTao.slice(0, 10)}</p>
                        </div>
                    </div>
                    <div className={Styles.information}>
                        <div className={Styles.boxInforKH}>
                            <h3>Thông tin khách hàng</h3>
                            <table className={Styles.inforKH}>
                                <tr className={Styles.inforKH1}>
                                    <th>Khách hàng:</th>
                                    <td>{hoadon.TenKH}</td>
                                </tr>
                                <tr className={Styles.inforKH2}>
                                    <th>Số điện thoại:</th>
                                    <td>{hoadon.SDT}</td>
                                </tr>
                                <tr className={Styles.inforKH1}>
                                    <th>Địa chỉ:</th>
                                    <td>{hoadon.DiaChi}</td>
                                </tr>
                                <tr className={Styles.inforKH2}>
                                    <th>Thiết bị sửa:</th>
                                    <td>{hoadon.ThietBiSua}</td>
                                </tr>
                                <tr className={Styles.inforKH1}>
                                    <th>Mô tả tình trạng:</th>
                                    <td>{hoadon.TinhTrang}</td>
                                </tr>
                            </table>
                        </div>
                        <div className={Styles.linhkienthay}>
                            <p style={{ fontWeight: '500', marginBottom: '12px' }}>Linh kiện thay</p>
                            <table>
                                <thead>
                                    <tr className={Styles.header}>
                                        <th style={{ width: '40px' }}>STT</th>
                                        <th >Linh kiện</th>
                                        <th >Số lượng</th>
                                        <th>Đơn giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dslinhkien && dslinhkien.map((linhkien1, stt) => (
                                        <tr key={stt}>
                                            <td style={{ width: '40px', border: "none" }}>{stt + 1}</td>
                                            <td style={{ border: "none", width: '500px' }}>
                                                {lkien.find(item => item.MaSP == linhkien1.MaSP).TenSP}
                                            </td>
                                            <td style={{ border: "none" }}> {linhkien1.SoLuong} </td>
                                            <td style={{ border: "none" }}>
                                                {lkien.find(item => item.MaSP == linhkien1.MaSP).DonGia}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className={Styles.total}>
                                        <td colSpan={3} >Phí sửa:</td>
                                        <td>{dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua) ? dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua).PhiSua : '0'}đ</td>
                                    </tr>
                                    <tr className={Styles.total}>
                                        <td colSpan={3} >Tổng tiền:</td>
                                        <td>{hoadon.TongTien}đ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={Styles.inforSC}>
                            <div className={Styles.inforLeft}>
                                <div className={Styles.titlel}>
                                    <p>Thông tin</p>
                                </div>
                                <div className={Styles.bottomtitle}>
                                    <p>Thiết bị sửa: {hoadon.ThietBiSua}</p>
                                    <p>Loại sửa chữa: {dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua) && dichvu.find(item => item.MaSuaChua == hoadon.MaSuaChua).TenSC}</p>
                                    <p>Mô tả sửa chữa: {hoadon.MoTaSuaChua && hoadon.MoTaSuaChua}</p>
                                    <p>Tiến độ: {hoadon.TienDoHD == 0 ? "Đợi sửa" : hoadon.TienDoHD == 1 ? "Đang sửa" : "Đã xong"}</p>
                                    <p>Trạng thái: {hoadon.TrangThaiHD == 0 ? "Chưa thanh toán" : "Đã thanh toán"}</p>
                                    <p>Thời gian: {datetime}</p>
                                    {/* <p>Nhân viên thanh toán: </p> */}
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <p>Thanh toán</p> */}
                                </div>
                                <div></div>
                            </div>
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