import React, { useLayoutEffect, useState } from 'react'
import Styles from './updatemanufacture.module.css'
import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const Updatemanufacture = (props) => {

    const { setDisplay, display, setIsSubmit, amanufacture } = props

    const [manufacture, setManufacture] = useState({
        "MaNCC": "",
        "TenNCC": "",
        "SDT": "",
        "DiaChi": ""
    })

    useLayoutEffect(() => {
        setManufacture(amanufacture)
    }, [amanufacture])


    const handleChangeManufacture = (e) => {
        const { name, value } = e.target
        setManufacture({
            ...manufacture,
            [name]: value
        })
    }

    const handleOnClickHuy = () => {
        setDisplay(false)
    }

    const handleSubmit = async () => {
        if (!manufacture.MaNCC || !manufacture.TenNCC || !manufacture.SDT || !manufacture.DiaChi) {
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
            const res = await axios.put('http://localhost:3500/manufacture', {
                MaNCC: manufacture.MaNCC,
                TenNCC: manufacture.TenNCC,
                SDT: manufacture.SDT,
                DiaChi: manufacture.DiaChi,
            });
            if (res.status == 200) {
                handleOnClickHuy()
                setIsSubmit(true)
            }
        }
    }

    return (
        <div className={Styles.container}>
            <h1>Cập nhật thông tin</h1>
            <div className={Styles.subcontainer}>
                <div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Mã nhà cung cấp</label>
                            <input readOnly={true} style={{ background: "#b7b7b7" }} name="MaNCC" type="text" value={manufacture.MaNCC} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Tên nhà cung cấp</label>
                            <input name="TenNCC" type="text" value={manufacture.TenNCC} onChange={handleChangeManufacture} />
                        </div>
                    </div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Số điện thoại</label>
                            <input name="SDT" type="text" value={manufacture.SDT} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Địa chỉ</label>
                            <input name="DiaChi" type="text" value={manufacture.DiaChi} onChange={handleChangeManufacture} />
                        </div>
                    </div>
                </div>
                <div className={Styles.btn}>
                    <button className={Styles.btnAdd} onClick={handleSubmit}><FaSave />Cập nhật</button>
                    <button className={Styles.btnCancel} onClick={handleOnClickHuy}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default Updatemanufacture