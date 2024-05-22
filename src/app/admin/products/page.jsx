"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Styles from './products.module.css'
import { FaSearch, FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import AddProduct from '@/component/addproduct/addproduct';
import axios from 'axios';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import RepairService from '@/component/repairservice/RepairService';

const Products = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [display, setDisplay] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false)
    const [deleteItem, setDeleteItem] = useState([])
    // const [service, setService] = useState(null)
    const [typeSearch, setTypeSearch] = useState('TenSP')
    const [maloai, setMaloai] = useState('')

    const fetchService = async () => {
        const res = await axios.get('http://localhost:3500/service')
        setService(res.data)
    }

    const fetchProducts = async (search) => {
        if (!search) { search = '' }
        const res = await axios.get(`http://localhost:3500/products/search?type=${typeSearch}&search=${search}&maloai=${maloai}`)
        const resCate = await axios.get('http://localhost:3500/products/categories')
        setProducts(chunkArray(res.data, 7))
        setCategories(resCate.data)
    }

    useEffect(() => {
        fetchService()
    }, [])

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

    const handleChanglePage = (e) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", e.target.value);
        router.push(pathname + "?" + params)
        setPage(e.target.value)
    }

    const handleNextPage = () => {
        const numPage = Number(products.length)
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
        try {
            const response = await axios.delete('http://localhost:3500/products/', {
                data: { productIds: deleteItem }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting products:', error.response ? error.response.data : error.message);
        }
        fetchProducts()
    };

    const handleDeleteOne = async (item) => {
        const ItemDL = [item.MaSP]

        try {
            const response = await axios.delete('http://localhost:3500/products/', {
                data: { productIds: ItemDL }
            });
            console.log(response);
        } catch (error) {
            console.error('Error deleting products:', error.response ? error.response.data : error.message);
        }
        fetchProducts()
    }

    const Toastify = () => {
        toast.info('Chức năng đang phát triển!', {
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
    console.log(categories);
    const handleSearch = (e) => {
        fetchProducts(e.target.value)
    }

    const handleChangleType = (e) => {
        setTypeSearch(e.target.value)
    }

    useEffect(() => {
        fetchProducts()
    }, [maloai])

    const handleChangleMaloai = (e) => {
        setMaloai(e.target.value)
    }

    return (
        <div className={Styles.container}>
            <ToastContainer />
            <p className={Styles.title}>Danh sách linh kiện</p>
            <div className={Styles.actionbar}>
                <select className={Styles.dropdown} onChange={handleChangleType}>
                    <option value="TenSP">Tên sản phẩm</option>
                    <option value="MaSP">Mã sản phẩm</option>
                </select>
                <div className={Styles.BoxSearch}>
                    <input onChange={handleSearch} type="text" placeholder='Tìm kiếm' className={Styles.inputSearch} />
                    <FaSearch className={Styles.btnSearch} size={20} onClick={Toastify} />
                </div>
                <button className={Styles.btnAdd} onClick={() => setDisplay(!display)}><FaPlus />Thêm linh kiện </button>
                <button className={Styles.btnDelete} onClick={handleClickDelete}>Xóa sản phẩm <MdDelete size={15} /></button>
                <select className={Styles.dropdown} onChange={handleChangleMaloai}>
                    <option value="">Tất cả</option>
                    {
                        categories && categories.map(cat => (
                            <option value={cat.MaLoai}>{cat.TenLoai}</option>
                        ))
                    }
                </select>
            </div>
            <div className={Styles.aroundTable}>
                <table className={Styles.table}>
                    <thead>
                        <tr>
                            <td style={{ width: "30px" }}><input type="checkbox" /></td>
                            <td>Mã sản phẩm</td>
                            <td style={{ width: "300px" }}>Tên sản phẩm</td>
                            <td>Danh mục</td>
                            {/* <td>Mô tả</td> */}
                            <td>Số lượng</td>
                            <td>Giá bán</td>
                            <td>Giá lắp đặt</td>
                            <td>Hình ảnh</td>
                            <td>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0
                            ?
                            products[page - 1].map((item, index) => (
                                <tr key={index} className={Styles.rowTable}>
                                    <td style={{ width: "30px" }}><input type="checkbox" onChange={(e) => handleSelectProduct(e, item.MaSP)} /></td>
                                    <td>{item.MaSP}</td>
                                    <td >{item.TenSP}</td>
                                    <td>{categories.find(cat => cat.MaLoai == item.MaLoai).TenLoai}</td>
                                    {/* <td>{item.MoTa}</td> */}
                                    <td>{item.SoLuongCon}</td>
                                    <td>{item.DonGia} </td>
                                    <td>{item.PhiLapDat}</td>
                                    <td><Image style={{ marginTop: "4px" }} width={60} height={40} src={item.HinhAnh} alt="aaaa" /></td>
                                    <td className={Styles.actionBtn}>
                                        <button className={Styles.Edit} onClick={Toastify}>
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
                        products && products.map((item, index) => (
                            <li onClick={handleChanglePage} value={index + 1} className={page == (index + 1) ? Styles.active : Styles.a}>{index + 1}</li>
                        ))
                    }
                </ul>
                <button onClick={handleNextPage}>&#62;</button>
            </div>
            <div style={!display ? { display: "none" } : { display: "" }} onClick={() => handleChildDisplayChange(!display)} className={Styles.blur}>

            </div>

            <div className={Styles.addproduct}>
                <AddProduct display={display} setDisplay={handleChildDisplayChange} categories={categories} setIsSubmit={setIsSubmit} />
            </div>

            {/* <RepairService service={service} /> */}

        </div>
    )
}

export default Products