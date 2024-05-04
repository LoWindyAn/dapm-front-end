import { usePathname, useRouter } from 'next/navigation';
import Styles from './listBillsRepair.module.css'
import { FaSearch, FaEdit } from "react-icons/fa";

const BillsRepair = ({ data, page }) => {
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
                    <td style={{ width: "120px" }}>Mã hóa đơn</td>
                    <td style={{ width: "300px" }}>Tên khách hàng</td>
                    <td style={{ width: "200px" }}>Số điện thoại</td>
                    <td style={{ width: "300px" }}>Địa chỉ</td>
                    <td>Trạng thái</td>
                    <td style={{ width: "100px" }}>Xem chi tiết</td>
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
                            <td style={{ cursor: "pointer" }} onClick={() => handleClickSeenDetail(item)}><FaEdit /></td>
                        </tr>
                    ))
                }


            </tbody>
        </table>
    )
}

export default BillsRepair