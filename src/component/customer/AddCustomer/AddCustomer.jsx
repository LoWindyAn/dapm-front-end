import React, { useState } from 'react'
import Styles from './AddCustomer.module.css'
import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const AddCustomer = (props) => {

    const { setDisplay, display, setIsSubmit } = props

    const [manufacture, setManufacture] = useState({
        "MaKH": "",
        "TenKH": "",
        "NgaySinh": null,
        "GioiTinh": 1,
        "SDT": "",
        "Email": null,
        "DiaChi": ""
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
            "MaKH": "",
            "TenKH": "",
            "NgaySinh": null,
            "GioiTinh": 1,
            "SDT": "",
            "Email": null,
            "DiaChi": ""
        })
        setDisplay(!display)
    }

    const handleSubmit = async () => {
        if (!manufacture.MaKH || !manufacture.TenKH || !manufacture.SDT) {
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
            let date = manufacture.NgaySinh
            if (date) {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 vào trước nếu tháng nhỏ hơn 10
                const day = date.getDate().toString().padStart(2, '0'); // Thêm số 0 vào trước nếu ngày nhỏ hơn 10

                // Định dạng lại chuỗi ngày tháng theo dạng 'yyyy-MM-dd'
                date = `${year}-${month}-${day}`;
            }
            const res = await axios.post('http://localhost:3500/customer', {
                MaKH: manufacture.MaKH,
                TenKH: manufacture.TenKH,
                NgaySinh: date,
                GioiTinh: manufacture.GioiTinh,
                SDT: manufacture.SDT,
                Email: manufacture.Email,
                DiaChi: manufacture.DiaChi
            });
            if (res.status == 200) {
                handleOnClickHuy()
                setIsSubmit(true)
            }
        }
    }

    const handleDateChange = (date) => {
        handleChangeManufacture({
            target: {
                name: 'NgaySinh',
                value: date
            }
        });
    };

    return (
        <div className={Styles.container}>
            <h1>Khách hàng mới</h1>
            <div className={Styles.subcontainer}>
                <div className={Styles.subcontainerr}>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Mã khách hàng</label>
                            <input name="MaKH" type="text" value={manufacture.MaKH} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Tên khách hàng</label>
                            <input name="TenKH" type="text" value={manufacture.TenKH} onChange={handleChangeManufacture} />
                        </div>
                    </div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Ngày sinh</label>
                            <DatePicker
                                selected={manufacture.NgaySinh}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                className={Styles.datePicker} // You can style the date picker using this class
                            />
                        </div>

                        <div className={Styles.part2M}>
                            <label htmlFor="">Địa chỉ</label>
                            <input name="DiaChi" type="text" value={manufacture.DiaChi} onChange={handleChangeManufacture} />
                        </div>
                    </div>
                    <div className={Styles.part2}>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Số điện thoại</label>
                            <input name="SDT" type="text" value={manufacture.SDT} onChange={handleChangeManufacture} />
                        </div>
                        <div className={Styles.part2M}>
                            <label htmlFor="">Email</label>
                            <input name="Email" type="text" value={manufacture.Email} onChange={handleChangeManufacture} />
                        </div>
                    </div>
                    <div className={Styles.part2}>
                        <div className={` ${Styles.containerGioitinh}`}>
                            <div className={Styles.gioitinh}>
                                <input name="GioiTinh" type="radio" value='1' onChange={handleChangeManufacture} />
                                <label htmlFor="">Nam</label>
                            </div>
                            <div className={Styles.gioitinh}>
                                <input name="GioiTinh" type="radio" value='0' onChange={handleChangeManufacture} />
                                <label htmlFor="">Nữ</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Styles.btn}>
                <button className={Styles.btnAdd} onClick={handleSubmit}><FaSave />Lưu</button>
                <button className={Styles.btnCancel} onClick={handleOnClickHuy}>Hủy</button>
            </div>
        </div>
    )
}

export default AddCustomer