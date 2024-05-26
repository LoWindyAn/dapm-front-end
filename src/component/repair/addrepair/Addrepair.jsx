import React, { useState } from 'react'
import Styles from './addrepair.module.css'
import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddRepair = (props) => {

    const { setDisplay, display, setIsSubmit } = props

    const [manufacture, setManufacture] = useState({
        "MaSuaChua": "",
        "TenSC": "",
        "PhiSua": ""
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
            "MaSuaChua": "",
            "TenSC": "",
            "PhiSua": ""
        })
        setDisplay(!display)
    }

    const handleSubmit = async () => {
        if (!manufacture.MaSuaChua || !manufacture.TenSC || !manufacture.PhiSua) {
            toast.error('Vui lòng nhập đủ thông tin!', {
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
            const res = await axios.post('http://localhost:3500/repair', {
                MaSuaChua: manufacture.MaSuaChua,
                TenSC: manufacture.TenSC,
                PhiSua: manufacture.PhiSua,
            });
            if (res.status == 200) {
                handleOnClickHuy()
                setIsSubmit(true)
            }
        }
    }

    return (
        <div className={Styles.container}>
            <h1>Dịch vụ sửa chữa mới</h1>
            <div className={Styles.subcontainer}>
                <div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Mã dịch vụ</label>
                            <input name="MaSuaChua" type="text" value={manufacture.MaSuaChua} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Loại dịch vụ</label>
                            <input name="TenSC" type="text" value={manufacture.TenSC} onChange={handleChangeManufacture} />
                        </div>
                    </div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Phí dịch vụ</label>
                            <input name="PhiSua" type="number" value={manufacture.PhiSua} onChange={handleChangeManufacture} />
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

export default AddRepair