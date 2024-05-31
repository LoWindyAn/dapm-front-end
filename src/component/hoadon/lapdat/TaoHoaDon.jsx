import React, { useState } from 'react'
import Styles from './TaoHoaDon.module.css'
import { FaSave } from 'react-icons/fa'
import axios from 'axios'

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

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setHoadon({
            ...hoadon,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        const res = await axios.post('http://localhost:3500/bill/install', hoadon)
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
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <p>Tạo hóa đơn lắp đặt</p>
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
            <div className={Styles.btn}>
                <button className={Styles.btnAdd} onClick={handleSubmit} ><FaSave />Lưu</button>
                <button className={Styles.btnCancel} onClick={() => setDisplay(false)}>Hủy</button>
            </div>
        </div>
    )
}

export default TaoHoaDon