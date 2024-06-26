
"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Styles from './bills.module.css'
import { FaSearch, FaEdit, FaPlus, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Addmanufacture from '@/component/manufacture/addmanufacture/Addmanufacture';
import Updatemanufacture from '@/component/manufacture/updatemanufacture/updatemanufacture';
import TaoHoaDon from '@/component/hoadon/suachua/TaoHoaDon';

const DSHoadon = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [display, setDisplay] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false)
    const [deleteItem, setDeleteItem] = useState([])
    const [typeSearch, setTypeSearch] = useState('SDT')
    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [manufactures, setManufactures] = useState(null)
    const [manufacture, setManufacture] = useState('')
    const [khachhang, setKhachhang] = useState([])

    const fetchProducts = async (search) => {
        if (!search) { search = '' }
        const manufac = await axios.get(`http://localhost:3500/bill/repair/search?type=${typeSearch}&search=${search}`)
        setManufactures(chunkArray(manufac.data, 7))
    }


    useEffect(async () => {
        fetchProducts()
        const kh = await axios.get(`http://localhost:3500/customer`)
        setKhachhang(kh.data)
    }, [])

    useEffect(() => {
        fetchProducts()
        setIsSubmit(false)
    }, [isSubmit])

    const handleChildDisplayChange = (newDisplay) => {
        setDisplay(newDisplay);
    };
    useEffect(() => {
        if (displayUpdate && display) {
            setDisplayUpdate(false)
        }
    }, [display])

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

    const handleSelectProduct = (e, MaSP) => {
        if (e.target.checked) {
            setDeleteItem([...deleteItem, MaSP]);
        } else {
            setDeleteItem(deleteItem.filter(i => i !== MaSP));
        }
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
        const ItemDL = [item.MaNCC]

        try {
            const response = await axios.delete('http://localhost:3500/bill/repair', {
                data: { productIds: ItemDL }
            });
            console.log(response);
        } catch (error) {
            console.error('Error deleting products:', error.response ? error.response.data : error.message);
        }
        fetchProducts()
    }

    const handleSearch = (e) => {
        fetchProducts(e.target.value)
    }

    const handleChangleType = (e) => {
        setTypeSearch(e.target.value)
    }


    const handleUpdate = async (item) => {
        await setManufacture(item)
        setIsUpdate(!isUpdate)
        handleChildDisplayUpdateChange(true)
        scrollToTop()
    }

    const handleChildDisplayUpdateChange = (newDisplay) => {
        setDisplayUpdate(newDisplay)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleClickAdd = () => {
        setDisplay(true)
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
                <button className={`${Styles.btnAdd} ${display ? Styles.btnAddShow : ''}`} onClick={handleClickAdd}><FaPlus />Tạo hóa đơn </button>
            </div>

            <div className={Styles.aroundTable}>
                <p>Danh sách hóa đơn</p>
                <table className={Styles.table}>
                    <thead>
                        <tr>
                            {/* <td style={{ width: "30px" }}><input type="checkbox" /></td> */}
                            <td style={{ width: "40px" }}>STT</td>
                            <td style={{ width: "120px" }}>Mã hóa đơn</td>
                            <td style={{ width: "300px" }}>Tên khách hàng</td>
                            <td style={{ width: "200px" }}>Số điện thoại</td>
                            <td style={{ width: "300px" }}>Ngày tạo</td>
                            <td>Trạng thái</td>
                            <td style={{ width: "200px" }}>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {manufactures && manufactures.length > 0
                            &&
                            manufactures[page - 1].map((item, index) => (
                                <tr key={index} className={Styles.rowTable}>
                                    {/* <td style={{ width: "30px" }}><input type="checkbox" onChange={(e) => handleSelectProduct(e, item.MaSP)} /></td> */}
                                    <td>{index + 1}</td>
                                    <td>{item.MaHD}</td>
                                    <td >{item.TenKH}</td>
                                    <td>{item.SDT}</td>
                                    <td>{item.NgayTao}</td>
                                    <td>{item.TrangThaiHD == 0 ? (<span>Chưa thanh toán</span>) : (<span>Đã thanh toán</span>)}</td>
                                    <td className={Styles.actionBtn}>
                                        <button className={Styles.View} onClick={() => handleView(item)}>
                                            <FaEye />
                                        </button>
                                        <button className={Styles.Edit} onClick={() => handleUpdate(item)}>
                                            <FaEdit />
                                        </button>
                                        <button className={Styles.Delete} onClick={() => handleDeleteOne(item)}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
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
                false &&
                <div className={Styles.modalTaoHoaDon}>
                    <div className={Styles.Overlay}></div>
                    <div className={Styles.TaoHoaDon}>
                        {/* <TaoHoaDon khachhang={khachhang} setDisplay={setDisplay} /> */}
                    </div>
                </div>
            }

        </div>
    )
}

export default DSHoadon