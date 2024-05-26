import React, { useState } from 'react'
import Styles from './TaoHoaDon.module.css'
import { FaSave } from 'react-icons/fa'
import ComboBox from '@/component/Combobox/combobox'
import axios from 'axios'

const TaoHoaDon = (props) => {
    const { khachhang, setDisplay, setIsSubmit } = props
    const [hoadon, setHoadon] = useState({
        "MaHD": "",
        "MaKH": "MA00001",
        "ThietBiSua": "",
        "TinhTrang": ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setHoadon({
            ...hoadon,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        const res = await axios.post('http://localhost:3500/bill/repair', hoadon)
        setIsSubmit(true)
        setDisplay(false)
    }
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <p>Tạo hóa đơn sửa chữa</p>
            </div>
            <div className={Styles.information}>
                <div>
                    <label htmlFor="">Mã hóa đơn</label>
                    <input name='MaHD' value={hoadon.MaHD} type="text" onChange={handleOnChange} />
                </div>
                <div>
                    <label htmlFor="">Khách hàng</label>
                    <select id="" name='MaKH' value={hoadon.MaKH} onChange={handleOnChange}>
                        {
                            khachhang && khachhang.map((item, index) => (
                                <option key={index} value={item.MaKH}>{item.MaKH} - {item.TenKH} - {item.SDT}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="">Thiết bị</label>
                    <input name='ThietBiSua' value={hoadon.ThietBiSua} type="text" onChange={handleOnChange} />
                </div>
                <div>
                    <label htmlFor="">Vấn đề</label>
                    <input name='TinhTrang' value={hoadon.TinhTrang} type="text" onChange={handleOnChange} />
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