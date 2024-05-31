import React, { useState } from 'react'
import Styles from './addmanufacture.module.css'
import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const Addmanufacture = (props) => {

    const { setDisplay, display, setIsSubmit } = props

    const [manufacture, setManufacture] = useState({
        "MaNV": "",
        "HoVaTen": "",
        "Luong": "",
        "SDT": "",
        "TenDangNhap": "",
        "VaiTro": "ktv",
        "MatKhau": ""
    })

    const handleChangeManufacture = (e) => {
        const { name, value } = e.target
        setManufacture({
            ...manufacture,
            [name]: value
        })
    }

    const handleOnClickHuy = () => {
        setManufacture({
            "MaNV": "",
            "HoVaTen": "",
            "Luong": "",
            "SDT": "",
            "TenDangNhap": "",
            "VaiTro": "ktv",
            "MatKhau": ""
        })
        setDisplay(!display)
    }

    const handleSubmit = async () => {
        if (!manufacture.MaNV || !manufacture.HoVaTen || !manufacture.TenDangNhap || !manufacture.MatKhau) {
            toast.error('Vui lòng nhập đủ thông tin linh kiện!', {
                position: "top-center",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            toast()
        } else {
            const res = await axios.post('http://localhost:3500/nhanvien', manufacture);
            if (res.status == 200) {
                handleOnClickHuy()
                setIsSubmit(true)
            }
        }
    }

    return (
        <div className={Styles.container}>
            <h1>Thông tin nhân viên</h1>
            <div className={Styles.subcontainer}>
                <div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Mã nhân viên</label>
                            <input name="MaNV" type="text" value={manufacture.MaNV} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Tên nhân viên</label>
                            <input name="HoVaTen" type="text" value={manufacture.HoVaTen} onChange={handleChangeManufacture} />
                        </div>
                    </div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Tên đăng nhập</label>
                            <input name="TenDangNhap" type="text" value={manufacture.TenDangNhap} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Mật khẩu</label>
                            <input name="MatKhau" type="text" value={manufacture.MatKhau} onChange={handleChangeManufacture} />
                        </div>
                    </div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Số điện thoại</label>
                            <input name="SDT" type="text" value={manufacture.SDT} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Vai trò</label>
                            <select name="VaiTro" id="" value={manufacture.VaiTro} onChange={handleChangeManufacture} style={{ height: '36px', borderRadius: '4px' }}>
                                <option value="ktv">Kỹ thuật viên</option>
                                <option value="sale">Nhân viên bán hàng</option>
                                <option value="nvk">Nhân viên kho</option>
                            </select>
                        </div>
                    </div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Lương</label>
                            <input name="Luong" type="text" value={manufacture.Luong} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                        </div>
                    </div>
                </div>
                <div className={Styles.btn}>
                    <button className={Styles.btnAdd} onClick={handleSubmit}><FaSave />Lưu</button>
                    <button className={Styles.btnCancel} onClick={handleOnClickHuy}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default Addmanufacture