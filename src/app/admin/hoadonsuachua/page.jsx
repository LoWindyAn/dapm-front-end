
"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Styles from './hoadon.module.css'
import { FaSearch, FaEdit, FaPlus, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import TaoHoaDon from '@/component/hoadon/suachua/TaoHoaDon';
import CapnhatHoaDon from '@/component/hoadon/suachua/CapnhatHoaDon';
import XemHoaDon from '@/component/hoadon/suachua/xemHoaDon2';
import { FaRegFaceSmileWink } from "react-icons/fa6";

const DSHoadon = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [display, setDisplay] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false)
    const [deleteItem, setDeleteItem] = useState([])
    const [typeSearch, setTypeSearch] = useState('SDT')
    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [manufactures, setManufactures] = useState(null)
    const [khachhang, setKhachhang] = useState([])
    const [hoadon, setHoadon] = useState({})
    const [dichvu, setDichvu] = useState([])
    const [linhkien, setLinhkien] = useState([])
    const [displayView, setDisplayView] = useState(false)
    const [viewHoadon, setViewHoaDon] = useState({})
    const [isView, setIsView] = useState(false)
    const [user, setUser] = useState({})
    const [trangThaiHD, setTrangThaiHD] = useState('')
    const [TienDoHD, setTienDoHD] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getUser = () => {
            return JSON.parse(localStorage.getItem('user'));
        }
        const userr = getUser()

        if (userr) {
            setUser(userr)
        }
    }, []);

    const fetchProducts = async () => {
        const userrr = JSON.parse(localStorage.getItem('user'));

        const manufac = await axios.get(`http://localhost:3500/bill/repair/search?type=${typeSearch}&search=${search}&VaiTro=${userrr.VaiTro}&MaNV=${userrr.MaTK}&TrangThaiHD=${trangThaiHD}&TienDoHD=${TienDoHD}`)

        setManufactures(chunkArray(manufac.data, 7))
    }

    const fetchKhachhang = async () => {
        const kh = await axios.get(`http://localhost:3500/customer`)
        setKhachhang(kh.data)
    }

    const fetchDichVu = async () => {
        const dv = await axios.get(`http://localhost:3500/repair`)
        setDichvu(dv.data)
    }

    const fetchLinhkien = async () => {
        const dv = await axios.get(`http://localhost:3500/products`)
        setLinhkien(dv.data)
    }



    useEffect(() => {
        fetchProducts()
        fetchKhachhang()
        fetchDichVu()
        fetchLinhkien()
    }, [])

    useEffect(() => {
        fetchProducts()
        setIsSubmit(false)
    }, [isSubmit])


    const handleChanglePage = (e) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", e.target.value);
        router.push(pathname + "?" + params)
        setPage(e.target.value)
    }

    const handleNextPage = () => {
        const numPage = Number(manufactures.length)
        const params = new URLSearchParams(searchParams.toString())
        if (Number(params.get("page")) < numPage) {
            const page = Number(params.get("page"))
            params.set("page", page + 1);
            router.push(pathname + "?" + params)
            setPage(page + 1)
            console.log(page);
        }
    }

    const handlePrevPage = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (Number(params.get("page")) > 1) {
            const page = Number(params.get("page"))
            params.set("page", page - 1);
            router.push(pathname + "?" + params)
            setPage(page - 1)
            console.log(page);
        }
    }

    function chunkArray(arr, chunkSize) {
        const chunkedArr = [];
        let i = 0;
        const n = arr.length;

        while (i < n) {
            const chunk = arr.slice(i, i + chunkSize);
            chunkedArr.push(chunk);
            i += chunkSize;
        }

        return chunkedArr;
    }



    const handleClickDelete = async () => {
        if (deleteItem.length > 0) {
            try {
                const response = await axios.delete('http://localhost:3500/products/', {
                    data: { productIds: deleteItem }
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error deleting products:', error.response ? error.response.data : error.message);
            }
            fetchProducts()
        }
        else {
            toast.error('Chọn ít nhất 1 sản phẩm để xóa', {
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
        }
    };

    const handleDeleteOne = async (item) => {
        const MaHD = item.MaHD
        try {
            const response = await axios.delete('http://localhost:3500/bill/repair', {
                data: { MaHD: MaHD }
            });
        } catch (error) {
            console.error('Error deleting products:', error.response ? error.response.data : error.message);
        }
        fetchProducts()
    }


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleChangleType = (e) => {
        setTypeSearch(e.target.value)
    }

    useEffect(() => {
        fetchProducts()
    }, [trangThaiHD, TienDoHD, search])

    const handleChangeTrangThai = (e) => {
        setTrangThaiHD(e.target.value)
    }

    const handleChangeTienDoHD = (e) => {
        setTienDoHD(e.target.value)
    }


    const handleClickAdd = () => {
        setDisplay(true)
    }

    useEffect(() => {
        if (!displayUpdate) {
            setDisplayUpdate(true)
        }
    }, [hoadon, isUpdate])

    useEffect(() => {
        setDisplayUpdate(false)
    }, [])

    const handleDisplayUpdate = (item) => {
        setHoadon(item)
        setIsUpdate(!isUpdate)
    }

    useEffect(() => {
        if (!displayView) {
            setDisplayView(true)
        }
    }, [viewHoadon, isView])

    useEffect(() => {
        setDisplayView(false)
    }, [])
    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        // const intervalId = setInterval(() => {
        //     fetchProducts()
        // }, 7000);

        // return () => clearInterval(intervalId);
        setTimeout(() => {
            setIsLoad(!isLoad)
        }, 7000)
        fetchProducts()
    }, [isLoad]);

    const handleView = (item) => {
        setViewHoaDon(item)
        setIsView(!isView)
    }

    return (
        <div className={Styles.container}>
            <ToastContainer />
            <p className={Styles.title}>Hóa đơn sửa chữa</p>
            <div className={Styles.actionbar}>
                <select className={Styles.dropdown} onChange={handleChangleType}>
                    <option value="SDT">Số điện thoại</option>
                    <option value="TenKH">Tên khách hàng</option>
                    <option value="MaHD">Mã hóa đơn</option>
                </select>
                <div className={Styles.BoxSearch}>
                    <input onChange={handleSearch} type="text" placeholder='Tìm kiếm' className={Styles.inputSearch} />
                    <FaSearch className={Styles.btnSearch} size={20} />
                </div>
                {/* {
                    user && user.VaiTro != 'ktv' &&
                    <button className={`${Styles.btnAdd} ${display ? Styles.btnAddShow : ''}`} onClick={handleClickAdd}><FaPlus />Tạo hóa đơn </button>
                } */}
                <select className={Styles.dropdown} name="TrangThaiHD" id="" onChange={handleChangeTrangThai}>
                    <option value="">Tất cả</option>
                    <option value="0">Chưa thanh toán</option>
                    <option value="1">Đã thanh toán</option>
                </select>

                <select className={Styles.dropdown} name="TienDoHD" id="" onChange={handleChangeTienDoHD}>
                    <option value="">Tất cả</option>
                    <option value="0">Đợi sửa</option>
                    <option value="1">Đang sửa</option>
                    <option value="2">Đã xong</option>
                </select>
            </div>

            <div className={Styles.aroundTable}>
                <p>Danh sách hóa đơn</p>
                <table className={Styles.table}>
                    <thead>
                        <tr>
                            {/* <td style={{ width: "30px" }}><input type="checkbox" /></td> */}
                            <td style={{ width: "40px" }}>STT</td>
                            <td style={{ width: "120px" }}>Mã hóa đơn</td>
                            <td style={{ width: "200px" }}>Tên khách hàng</td>
                            <td style={{ width: "150px" }}>Số điện thoại</td>
                            <td style={{ width: "200px" }}>Ngày tạo</td>
                            <td>Tiến độ sửa chữa</td>
                            <td>Trạng thái</td>
                            <td>Tổng tiền</td>
                            <td style={{ width: "200px" }}>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {manufactures && manufactures.length > 0
                            ?
                            manufactures[page - 1].map((item, index) => (
                                <tr key={index} className={Styles.rowTable}>
                                    {/* <td style={{ width: "30px" }}><input type="checkbox" onChange={(e) => handleSelectProduct(e, item.MaSP)} /></td> */}
                                    <td>{index + 1}</td>
                                    <td>{item.MaHD}</td>
                                    <td >{item.TenKH}</td>
                                    <td>{item.SDT}</td>
                                    <td>{item.NgayTao}</td>
                                    <td style={{ color: item.TienDoHD == 0 ? 'rgb(255, 153, 0)' : item.TienDoHD == 1 ? 'blue' : 'rgb(55, 255, 0)', fontWeight: '700' }}>{item.TienDoHD == 0 ? (<span>Đợi sửa</span>) : item.TienDoHD == 1 ? (<span>Đang sửa</span>) : (<span>Đã xong</span>)}</td>
                                    <td style={{ color: item.TrangThaiHD == 0 ? 'blue' : 'rgb(55, 255, 0)', fontWeight: '700' }}>{item.TrangThaiHD == 0 ? (<span>Chưa thanh toán</span>) : (<span>Đã thanh toán</span>)}</td>
                                    <td>{item.TongTien}</td>
                                    <td className={Styles.actionBtn}>
                                        {user && user.VaiTro != 'ktv' &&
                                            <button className={Styles.View} onClick={() => handleView(item)}>
                                                <FaEye />
                                            </button>
                                        }
                                        <button className={Styles.Edit} onClick={() => handleDisplayUpdate(item)}>
                                            <FaEdit />
                                        </button>
                                        <button className={Styles.Delete} onClick={() => handleDeleteOne(item)}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={9} style={{ height: '52px', fontSize: '20px' }}> <FaRegFaceSmileWink /> Không tìm thấy đơn</td>

                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className={Styles.pagination}>
                <button onClick={handlePrevPage}>&#60;</button>
                <ul>
                    {
                        manufactures && manufactures.map((item, index) => (
                            <li key={index} onClick={handleChanglePage} value={index + 1} className={page == (index + 1) ? Styles.active : Styles.a}>{index + 1}</li>
                        ))
                    }
                </ul>
                <button onClick={handleNextPage}>&#62;</button>
            </div>
            {
                display &&
                <div className={Styles.modalTaoHoaDon}>
                    <div className={Styles.Overlay}></div>
                    <div className={Styles.TaoHoaDon}>
                        <TaoHoaDon khachhang={khachhang} setDisplay={setDisplay} setIsSubmit={setIsSubmit} />
                    </div>
                </div>
            }

            {
                displayUpdate &&
                <div className={Styles.modalTaoHoaDon}>
                    <div className={Styles.Overlay}></div>
                    <div className={Styles.TaoHoaDon}>
                        <CapnhatHoaDon linhkien={linhkien} ahoadon={hoadon} dichvu={dichvu} khachhang={khachhang} setDisplay={setDisplayUpdate} setIsSubmit={setIsSubmit} />
                    </div>
                </div>
            }

            {
                displayView &&
                <div className={Styles.modalTaoHoaDon}>
                    <div className={Styles.Overlay}></div>
                    <div className={Styles.TaoHoaDon}>
                        <XemHoaDon user={user} linhkien={linhkien} ahoadon={viewHoadon} dichvu={dichvu} khachhang={khachhang} setDisplay={setDisplayView} setIsSubmit={setIsSubmit} />
                    </div>
                </div>
            }

        </div>
    )
}

export default DSHoadon