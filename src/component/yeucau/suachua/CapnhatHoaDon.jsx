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
        setHoadon(ahoadon)
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

    // useEffect(() => {
    //     const newlkien = linhkien.filter(item => !dslinhkien.some(dslk => dslk.MaSP == item.MaSP))
    //     setLkien(newlkien)
    // }, [dslinhkien])

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
        const res = await axios.put('http://localhost:3500/bill/repair', { hoadon, dslinhkien, user })
        setIsSubmit(true)
        setDisplay(false)
    }

    const handleCancel = () => {
        setDisplay(false)
    }

    const handleTiepNhan = async () => {
        const res = await axios.put('http://localhost:3500/yeucau/suachua/tiepnhan', { hoadon, user })
        setIsSubmit(true)
        setDisplay(false)
    }
    const handleTuChoi = async () => {
        const res = await axios.put('http://localhost:3500/yeucau/suachua/tuchoi', { hoadon, user })
        setIsSubmit(true)
        setDisplay(false)
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <p>Yêu cầu sửa chữa #{hoadon.MaHD}</p>
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
                    </table>
                </div>
                <div className={Styles.inforSC}>
                    <h3>Thông tin sửa chữa</h3>
                    <div className={Styles.suachua}>
                        <p>Thiết bị sửa: <span>{hoadon.ThietBiSua}</span></p>
                        <p>Mô tả tình trạng: <span>{hoadon.TinhTrang}</span></p>
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

            </div>
            <div className={Styles.btn}>
                {/* <button className={Styles.btnAdd} onClick={handleSubmit} ><FaSave />Lưu</button> */}
                <button className={Styles.btnCancel} onClick={handleCancel}>Thoát</button>
            </div>
        </div>
    )
}

export default TaoHoaDon