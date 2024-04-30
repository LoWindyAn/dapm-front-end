"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Styles from './products.module.css'
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import AddProduct from '@/component/addproduct/addproduct';


const Products = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()
    const page = Number(searchParams.get("page"))
    const handleChanglePage = (e) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", e.target.value);
        router.push(pathname + "?" + params)
    }

    const [display, setDisplay] = useState(false);
    const handleChildDisplayChange = (newDisplay) => {
        setDisplay(newDisplay);
    };
    return (
        <div className={Styles.container}>
            <p className={Styles.title}>Danh sách linh kiện</p>
            <div className={Styles.actionbar}>
                <select className={Styles.dropdown}>
                    <option value="0">Tên</option>
                    <option value="1">Danh mục</option>
                    <option value="2">Mã sản phẩm</option>
                </select>
                <div className={Styles.BoxSearch}>
                    <input type="text" placeholder='Tìm kiếm' className={Styles.inputSearch} />
                    <FaSearch className={Styles.btnSearch} size={20} />
                </div>
                <button className={Styles.btnAdd} onClick={() => setDisplay(!display)}>Thêm</button>
                <button className={Styles.btnDelete}>Xóa <MdDelete size={15} /></button>
            </div>
            <table className={Styles.table}>
                <thead>
                    <tr>
                        <td>Mã sản phẩm</td>
                        <td>Tên sản phẩm</td>
                        <td>Danh mục</td>
                        <td>Mô tả</td>
                        <td>Số lượng</td>
                        <td>Giá bán</td>
                        <td>Giá lắp đặt</td>
                        <td>Hình ảnh</td>
                        <td>Cập nhật</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
            <div className={Styles.pagination}>
                <button>&#60;</button>
                <ul>
                    <li onClick={handleChanglePage} value={1} className={page == 1 ? Styles.active : Styles.a}>1</li>
                    <li onClick={handleChanglePage} value={2} className={page == 2 ? Styles.active : Styles.a}>2</li>
                    <li onClick={handleChanglePage} value={3} className={page == 3 ? Styles.active : Styles.a}>3</li>
                    <li onClick={handleChanglePage} value={4} className={page == 4 ? Styles.active : Styles.a}>4</li>
                    <li onClick={handleChanglePage} value={5} className={page == 5 ? Styles.active : Styles.a}>5</li>
                </ul>
                <button>&#62;</button>
            </div>
            <div style={!display ? { display: "none" } : { display: "" }} onClick={() => handleChildDisplayChange(!display)} className={Styles.blur}>

            </div>

            <div className={Styles.addproduct}>
                <AddProduct display={display} setDisplay={handleChildDisplayChange} />
            </div>
        </div>
    )
}

export default Products