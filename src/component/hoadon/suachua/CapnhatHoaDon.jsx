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

    useEffect(() => {
        const fetchDsLinhkien = async () => {
            const res = await axios.get(`http://localhost:3500/bill/repair/dslinhkien?MaHD=${ahoadon.MaHD}`)
            setDsLinhkien(res.data)
        }
        setLkien(linhkien)
        fetchDsLinhkien()
    }, [ahoadon])

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
        const res = await axios.put('http://localhost:3500/bill/repair', { hoadon, dslinhkien })
        setIsSubmit(true)
        setDisplay(false)
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <p>Cập nhật hóa đơn sửa chữa #{hoadon.MaHD}</p>
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
                            <th>Thiết bị sửa:</th>
                            <td>{hoadon.ThietBiSua}</td>
                        </tr>
                        <tr className={Styles.inforKH2}>
                            <th>Mô tả tình trạng:</th>
                            <td>{hoadon.TinhTrang}</td>
                        </tr>
                    </table>
                </div>
                <div className={Styles.inforSC}>
                    <div className={Styles.inforMotaSuachua}>
                        <div>
                            <p>Mô tả sửa chữa</p>
                            {/* <input name='ThietBiSua' value={hoadon.ThietBiSua} type="text" onChange={handleOnChange} /> */}
                            <textarea name='MoTaSuaChua' value={hoadon.MoTaSuaChua} onChange={handleOnChange} rows="6"></textarea>
                        </div>
                        <div>
                            <p>Loại dịch vụ</p>
                            <select id="" name='MaSuaChua' value={hoadon.MaSuaChua} onChange={handleOnChange}>
                                {
                                    dichvu && dichvu.map((item, index) => (
                                        <option key={index} value={item.MaSuaChua}>{item.TenSC} | {item.PhiSua}đ</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className={Styles.ContainerTrangThai}>
                        <div className={Styles.TrangThaiHD}>
                            <p>Trạng thái hóa đơn</p>
                            <div className={Styles.BoxTrangthai}>
                                <div className={Styles.SubBoxTrangthai}>
                                    <input
                                        type="radio"
                                        name="TrangThaiHD"
                                        value='0'
                                        checked={hoadon.TrangThaiHD == '0'}
                                        onChange={handleChange}
                                    />
                                    <p >Chưa thanh toán</p>
                                </div>
                                <div className={Styles.SubBoxTrangthai}>
                                    <input
                                        type="radio"
                                        name="TrangThaiHD"
                                        value='1'
                                        checked={hoadon.TrangThaiHD == '1'}
                                        onChange={handleChange}
                                    />
                                    <p >Đã thanh toán</p>
                                </div>
                            </div>
                        </div>
                        <div className={Styles.TienDoHD}>
                            <p>Tiến độ sửa chữa</p>
                            <div className={Styles.BoxTrangthai}>
                                <div className={Styles.SubBoxTrangthai}>
                                    <input
                                        type="radio"
                                        name="TienDoHD"
                                        value='0'
                                        checked={hoadon.TienDoHD == '0'}
                                        onChange={handleChange}
                                    />
                                    <label >Đợi sửa</label>
                                </div>
                                <div className={Styles.SubBoxTrangthai}>
                                    <input
                                        type="radio"
                                        name="TienDoHD"
                                        value='1'
                                        checked={hoadon.TienDoHD == '1'}
                                        onChange={handleChange}
                                    />
                                    <label >Đang sửa</label>
                                </div>
                                <div className={Styles.SubBoxTrangthai}>
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
                <div className={Styles.linhkienthay}>
                    <p style={{ fontWeight: '500', marginBottom: '12px' }}>Linh kiện thay</p>
                    <table>
                        <thead>
                            <tr className={Styles.header}>
                                <th style={{ width: '30px' }}>STT</th>
                                <th>Linh kiện thay</th>
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
                                                <option key={index} value={item.MaSP}>{item.TenSP} | {item.DonGia}đ</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><input type="text" name='SoLuong' value={linhkien1.SoLuong} style={{ width: '50px', textAlign: 'center' }} onChange={(e) => changeLinhKien(e, linhkien1.MaSP)} /></td>
                                    <td style={{ cursor: 'pointer' }} onClick={() => deleteLinhKien(linhkien1.MaSP)}><IoClose /></td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} style={{ height: "32px", cursor: 'pointer' }} onClick={moreLinhkien}><FaPlus /></td>
                            </tr>
                        </tbody>
                    </table>
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