
"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Styles from './customer.module.css'
import { FaSearch, FaEdit, FaPlus, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AddCustomer from '@/component/customer/AddCustomer/AddCustomer';
import UpdateCustomer from '@/component/customer/UpdateCustomer/UpdateCustomer';

const Customer = () => {
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

    const fetchProducts = async (search) => {
        if (!search) { search = '' }
        const manufac = await axios.get(`http://localhost:3500/customer/search?type=${typeSearch}&search=${search}`)
        setManufactures(chunkArray(manufac.data, 7))
    }

    useEffect(() => {
        fetchProducts()
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
        const ItemDL = [item.MaKH]

        try {
            const response = await axios.delete('http://localhost:3500/customer/', {
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
        if (displayUpdate) {
            setDisplayUpdate(false)
        }
        setDisplay(!display)
    }

    const handleView = (item) => {
        router.push(`http://localhost:3000/admin/customer/${item.MaKH}`)
    }

    return (
        <div className={Styles.container}>
            <ToastContainer />
            <p className={Styles.title}>Khách hàng</p>
            <div className={Styles.actionbar}>
                <select className={Styles.dropdown} onChange={handleChangleType}>
                    <option value="SDT">Số điện thoại</option>
                    <option value="TenKH">Tên khách hàng</option>
                </select>
                <div className={Styles.BoxSearch}>
                    <input onChange={handleSearch} type="text" placeholder='Tìm kiếm' className={Styles.inputSearch} />
                    <FaSearch className={Styles.btnSearch} size={20} />
                </div>
                <button className={`${Styles.btnAdd} ${display ? Styles.btnAddShow : ''}`} onClick={handleClickAdd}><FaPlus />Khách hàng mới </button>
                <button className={Styles.btnDelete} onClick={handleClickDelete}>Xóa NCC <MdDelete size={15} /></button>
            </div>

            <div className={`${Styles.addManufacture} ${display ? '' : Styles.show}`}>
                <AddCustomer display={display} setDisplay={handleChildDisplayChange} setIsSubmit={setIsSubmit} />
            </div>

            <div className={`${Styles.updateManufacture} ${!displayUpdate ? '' : Styles.show}`}>
                <UpdateCustomer amanufacture={manufacture} display={displayUpdate} setDisplay={handleChildDisplayUpdateChange} setIsSubmit={setIsSubmit} />
            </div>
            <div className={Styles.aroundTable}>
                <p>Danh sách khách hàng</p>
                <table className={Styles.table}>
                    <thead>
                        <tr>
                            {/* <td style={{ width: "30px" }}><input type="checkbox" /></td> */}
                            <td style={{ width: "40px" }}>STT</td>
                            <td style={{ width: "120px" }}>Mã khách hàng</td>
                            <td style={{ width: "200px" }}>Tên khách hàng</td>
                            <td style={{ width: "120px" }}>Ngày sinh</td>
                            <td style={{ width: "80px" }}>Giới tính</td>
                            <td style={{ width: "120px" }}>Số điện thoại</td>
                            <td style={{ width: "150px" }}>Email</td>
                            <td>Địa chỉ</td>
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
                                    <td>{item.MaKH}</td>
                                    <td >{item.TenKH}</td>
                                    <td>{item.NgaySinh && item.NgaySinh.slice(0, 10)}</td>
                                    <td>{item.GioiTinh == 0 ? 'Nữ' : 'Nam'}</td>
                                    <td>{item.SDT}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.DiaChi}</td>
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


                            : (<td colSpan={9} style={{ height: '200px' }}><div>Không có sản phẩm nào được tìm thấy</div></td>)
                        }
                    </tbody>
                </table>
            </div>
            <div className={Styles.pagination}>
                <button onClick={handlePrevPage}>&#60;</button>
                <ul>
                    {
                        manufactures && manufactures.map((item, index) => (
                            <li onClick={handleChanglePage} value={index + 1} className={page == (index + 1) ? Styles.active : Styles.a}>{index + 1}</li>
                        ))
                    }
                </ul>
                <button onClick={handleNextPage}>&#62;</button>
            </div>
        </div>
    )
}

export default Customer