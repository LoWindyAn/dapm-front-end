import React, { useEffect, useLayoutEffect, useState } from 'react'
import Styles from './CapnhatHoaDon.module.css'
import { FaSave } from 'react-icons/fa'
import axios from 'axios'

const TaoHoaDon = (props) => {
    const { khachhang, setDisplay, setIsSubmit, ahoadon, dichvu } = props
    const [hoadon, setHoadon] = useState({})
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
    const handleSubmit = async () => {
        const res = await axios.post('http://localhost:3500/bill/repair', hoadon)
        setIsSubmit(true)
        setDisplay(false)
    }
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <p>Cập nhật hóa đơn sửa chữa #{hoadon.MaHD}</p>
            </div>
            <div className={Styles.information}>
                <table className={Styles.inforKH}>
                    <tr>
                        <th>Tên khách hàng:</th>
                        <td>{hoadon.TenKH}</td>
                    </tr>
                    <tr>
                        <th>Số điện thoại:</th>
                        <td>{hoadon.SDT}</td>
                    </tr>
                    <tr>
                        <th>Thiết bị sửa:</th>
                        <td>{hoadon.ThietBiSua}</td>
                    </tr>
                    <tr>
                        <th>Mô tả tình trạng:</th>
                        <td>{hoadon.TinhTrang}</td>
                    </tr>
                </table>
                <div className={Styles.inforSC}>
                    <div>
                        <div>
                            <label htmlFor="">Loại dịch vụ</label>
                            <select id="" name='MaKH' onChange={handleOnChange}>
                                {
                                    dichvu && dichvu.map((item, index) => (
                                        <option key={index} value={dichvu.MaSuaChua}>{item.TenSC} - {item.PhiSua} </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">Mô tả sửa chữa</label>
                            <input name='ThietBiSua' value={hoadon.ThietBiSua} type="text" onChange={handleOnChange} />
                        </div>
                    </div>
                    <div>
                        <div className={Styles.TrangThaiHD}>
                            {/* <p>Trạng thái</p> */}
                            <div >
                                <input
                                    type="radio"
                                    name="TrangThaiHD"
                                    value='0'
                                    checked={hoadon.TrangThaiHD == '0'}
                                    onChange={handleChange}
                                />
                                <label >Chưa thanh toán</label>
                            </div>
                            <div >
                                <input
                                    type="radio"
                                    name="TrangThaiHD"
                                    value='1'
                                    checked={hoadon.TrangThaiHD == '1'}
                                    onChange={handleChange}
                                />
                                <label >Đã thanh toán</label>
                            </div>
                        </div>
                        <div>
                            <p>Tiến độ</p>
                            <div >
                                <input
                                    type="radio"
                                    name="TienDoHD"
                                    value='0'
                                    checked={hoadon.TienDoHD == '0'}
                                    onChange={handleChange}
                                />
                                <label >Đợi sửa</label>
                            </div>
                            <div >
                                <input
                                    type="radio"
                                    name="TienDoHD"
                                    value='1'
                                    checked={hoadon.TienDoHD == '1'}
                                    onChange={handleChange}
                                />
                                <label >Đang sửa</label>
                            </div>
                            <div >
                                <input
                                    type="radio"
                                    name="TienDoHD"
                                    value='2'
                                    checked={hoadon.TienDoHD == '2'}
                                    onChange={handleChange}
                                />
                                <label >Đã xong</label>
                            </div>
                        </div>
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