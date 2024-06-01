import React, { useEffect, useState } from 'react'
import Styles from './TaoHoaDon.module.css'
import { FaPlus, FaSave } from 'react-icons/fa'
import axios from 'axios'
import { IoClose } from 'react-icons/io5'

const TaoHoaDon = (props) => {
    const { khachhang, setDisplay, setIsSubmit } = props
    const [hoadon, setHoadon] = useState({
        "MaHD": "",
        "MaKH": "",
        "ThietBiLap": "",
        "SDT": "",
        "TenKH": "",
        "DiaChi": ""
    })
    const [listKH, setListKH] = useState([])
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

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setHoadon({
            ...hoadon,
            [name]: value
        })
    }

    const fetchLinhkien = async () => {
        const dv = await axios.get(`http://localhost:3500/products`)
        setLkien(dv.data)
    }

    useEffect(() => {
        fetchLinhkien()
    }, [])

    const handleSubmit = async () => {
        const res = await axios.post('http://localhost:3500/yeucau/lapdat', { hoadon, dslinhkien })
        setIsSubmit(true)
        setDisplay(false)
    }

    const handleChangeSDT = async (e) => {
        const { value } = e.target
        setHoadon({
            ...hoadon,
            ['SDT']: value
        })
        if (value != '') {
            const search = await axios.get(`http://localhost:3500/customer/search?type=SDT&search=${value}`)
            setListKH(search.data)
        } else {
            setListKH([])
        }
    }

    const handleOnClickKH = (item) => {
        setHoadon({
            ...hoadon,
            ['SDT']: item.SDT,
            ['TenKH']: item.TenKH,
            ['DiaChi']: item.DiaChi,
            ['MaKH']: item.MaKH
        })
        setListKH([])
    }

    const moreLinhkien = () => {
        setDsLinhkien(
            [...dslinhkien,
            {
                MaSP: lkien[0].MaSP,
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
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <p>Tạo yêu cầu lắp đặt mới</p>
            </div>
            <div className={Styles.information}>
                <div className={Styles.inforKH}>
                    <p style={{ marginBottom: "8px", fontWeight: '600' }}>Thông tin khách hàng:</p>
                    <div className={Styles.sdt}>
                        <label htmlFor="">Số điện thoại</label>
                        <input name='SDT' value={hoadon.SDT} type="text" onChange={handleChangeSDT} autocomplete="off" />
                    </div>
                    {
                        listKH && listKH.length > 0 &&
                        (<ul className={Styles.listKH}>
                            {
                                listKH.map((item, index) => (
                                    <li key={index} onClick={() => handleOnClickKH(item)}>{item.SDT}-{item.TenKH}</li>
                                ))
                            }
                        </ul>)
                    }
                    <div>
                        <label htmlFor="">Mã khách hàng</label>
                        <input name='MaKH' value={hoadon.MaKH} type="text" onChange={handleOnChange} />
                    </div>

                    <div>
                        <label htmlFor="">Tên khách hàng</label>
                        <input name='TenKH' value={hoadon.TenKH} type="text" onChange={handleOnChange} />
                    </div>
                    <div>
                        <label htmlFor="">Địa chỉ</label>
                        <input name='DiaChi' value={hoadon.DiaChi} type="text" onChange={handleOnChange} />
                    </div>
                </div>
                <div className={Styles.inforHD}>
                    <p style={{ marginBottom: "8px", fontWeight: '600' }}>Thông tin lắp đặt:</p>
                    <div>
                        <label htmlFor="">Mã hóa đơn</label>
                        <input name='MaHD' value={hoadon.MaHD} type="text" onChange={handleOnChange} />
                    </div>

                    <div>
                        <label htmlFor="">Thiết bị</label>
                        <input name='ThietBiLap' value={hoadon.ThietBiLap} type="text" onChange={handleOnChange} />
                    </div>
                </div>
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
                            <th></th>
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
                                <td>{lkien.find(item => item.MaSP == linhkien1.MaSP) && lkien.find(item => item.MaSP == linhkien1.MaSP).DonGia}đ</td>
                                <td><input type="text" name='SoLuong' value={linhkien1.SoLuong} style={{ width: '50px', textAlign: 'center' }} onChange={(e) => changeLinhKien(e, linhkien1.MaSP)} /></td>
                                <td style={{ cursor: 'pointer' }} onClick={() => deleteLinhKien(linhkien1.MaSP)}><IoClose /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5} style={{ height: "32px", cursor: 'pointer' }} onClick={moreLinhkien}><FaPlus /></td>
                        </tr>
                    </tbody>
                    {user && user.VaiTro == 'sale' &&
                        (<div className={Styles.disabled}>

                        </div>)}
                </table>
            </div>
            <div className={Styles.btn}>
                <button className={Styles.btnAdd} onClick={handleSubmit} ><FaSave />Lưu</button>
                <button className={Styles.btnCancel} onClick={() => setDisplay(false)}>Hủy</button>
            </div>
        </div>
    )
}

export default TaoHoaDon