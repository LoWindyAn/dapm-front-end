import React, { useEffect, useLayoutEffect, useState } from 'react'
import Styles from './CapnhatHoaDon.module.css'
import { FaPlus, FaSave } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import axios from 'axios'

const TaoHoaDon = (props) => {
    const { khachhang, setDisplay, setIsSubmit, ahoadon, dichvu, linhkien } = props
    const [hoadon, setHoadon] = useState({})
    const [dslinhkien, setDsLinhkien] = useState([])
    const [lkien, setLkien] = useState([])
    const [user, setUser] = useState({})
    const [nv, setNv] = useState()


    useEffect(() => {
        const fetchDsLinhkien = async () => {
            const res = await axios.get(`http://localhost:3500/bill/repair/dslinhkien?MaHD=${ahoadon.MaHD}`)
            setDsLinhkien(res.data)
        }
        setLkien(linhkien)
        fetchDsLinhkien()
    }, [ahoadon])

    useEffect(() => {
        const a = async () => {
            const b = await axios.get(`http://localhost:3500/yeucau/suachua/dsnhanvien?MaHD=${ahoadon.MaHD}`)
            setNv(b.data[0])
        }
        a()
    }, [ahoadon])

    useEffect(() => {
        const getUser = () => {
            return JSON.parse(localStorage.getItem('user'));
        }
        const userr = getUser()

        if (userr) {
            setUser(userr)
        }
    }, []);

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

    const handleSubmit = async () => {
        const res = await axios.put('http://localhost:3500/bill/install', { hoadon, dslinhkien, user })
        setIsSubmit(true)
        setDisplay(false)
    }

    const handleCancel = () => {
        setDisplay(false)
    }

    const handleTiepNhan = async () => {
        const res = await axios.put('http://localhost:3500/yeucau/lapdat/tiepnhan', { hoadon, user })
        setIsSubmit(true)
        setDisplay(false)
    }
    const handleTuChoi = async () => {
        const res = await axios.put('http://localhost:3500/yeucau/lapdat/tuchoi', { hoadon, user })
        setIsSubmit(true)
        setDisplay(false)
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <p>Yêu cầu lắp đặt #{hoadon.MaHD}</p>
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
                            <th>Thiết bị lắp:</th>
                            <td>{hoadon.ThietBiLap}</td>
                        </tr>
                    </table>
                </div>
                <div className={Styles.linhkienthay}>
                    <p style={{ fontWeight: '500', marginBottom: '12px' }}>Linh kiện lắp đặt</p>
                    <table>
                        <thead>
                            <tr className={Styles.header}>
                                <th style={{ width: '30px' }}>STT</th>
                                <th>Linh kiện</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {dslinhkien && dslinhkien.map((linhkien1, stt) => (
                                <tr key={stt}>
                                    <td style={{ width: '30px' }}>{stt + 1}</td>
                                    <td>
                                        <select name="MaSP" id="" value={linhkien1.MaSP} style={{ borderRadius: '0' }} onChange={(e) => changeLinhKien(e, linhkien1.MaSP)}>
                                            {lkien && lkien.map((item, index) => (
                                                <option key={index} value={item.MaSP}>{item.TenSP}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{lkien.find(item => item.MaSP == linhkien1.MaSP) && lkien.find(item => item.MaSP == linhkien1.MaSP).DonGia}</td>
                                    <td><input type="text" name='SoLuong' value={linhkien1.SoLuong} style={{ width: '50px', textAlign: 'center' }} onChange={(e) => changeLinhKien(e, linhkien1.MaSP)} /></td>
                                    {/* <td style={{ cursor: 'pointer' }} onClick={() => deleteLinhKien(linhkien1.MaSP)}><IoClose /></td> */}
                                </tr>
                            ))}
                            {/* <tr>
                                <td colSpan={4} style={{ height: "32px", cursor: 'pointer' }} onClick={moreLinhkien}><FaPlus /></td>
                            </tr> */}
                        </tbody>
                        <div className={Styles.disabled}>
                        </div>
                    </table>
                </div>
            </div>
            {hoadon.TrangThaiDuyet == 0 && user.VaiTro != 'sale' &&
                <div className={Styles.tutiep}>
                    <div className={Styles.tuchoi}>
                        <button onClick={handleTuChoi}>Từ chối</button>
                        <textarea type="text" name='LyDoHuy' value={hoadon.LyDoHuy} onChange={handleChange} placeholder='Nhập lý do từ chối' />
                    </div>
                    <div className={Styles.tiepnhan}>
                        <button onClick={handleTiepNhan}>Tiếp nhận</button>
                    </div>
                </div>

            }

            {
                hoadon.TrangThaiDuyet == 2 &&
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p style={{ color: 'red', fontWeight: '700' }}>Đã từ chối</p>
                    <p>Lý do: {hoadon.LyDoHuy}</p>
                    <p>Nhân viên từ chối: {nv && nv.HoVaTen && nv.HoVaTen}</p>
                </div>
            }
            <div className={Styles.btn}>
                <button className={Styles.btnCancel} onClick={handleCancel}>Thoát</button>
            </div>
        </div>
    )
}

export default TaoHoaDon