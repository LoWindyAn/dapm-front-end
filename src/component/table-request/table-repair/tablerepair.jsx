import { usePathname, useRouter } from 'next/navigation';
import Styles from './tablerequest.module.css'
import { FaSearch, FaEdit } from "react-icons/fa";

const TableRepair = ({ data, page }) => {
    const router = useRouter()
    const pathname = usePathname()
    const handleClickSeenDetail = (item) => {
        router.push(pathname + "/" + item.id + "?type=0")
    }
    return (
        <table className={Styles.table}>
            <thead>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Mã yêu cầu</td>
                    <td>Tên khách hàng</td>
                    <td>Số điện thoại</td>
                    <td>Địa chỉ</td>
                    <td>Thiết bị cần sửa</td>
                    <td>Mô tả tình trạng</td>
                    <td>Trạng thái</td>
                    <td>Xem chi tiết</td>
                </tr>
            </thead>

            <tbody>
                {
                    data[page - 1].map(item => (
                        <tr key={item.id}>
                            <td><input type="checkbox" /></td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.id}</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td style={{ cursor: "pointer" }} onClick={() => handleClickSeenDetail(item)}><FaEdit /></td>
                        </tr>
                    ))
                }


            </tbody>
        </table>
    )
}

export default TableRepair