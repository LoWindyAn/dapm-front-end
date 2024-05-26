import { usePathname, useRouter } from 'next/navigation';
import Styles from './listBillsRepair.module.css'
import { FaSearch, FaEdit } from "react-icons/fa";

const BillsRepair = ({ data, page }) => {
    const router = useRouter()
    const pathname = usePathname()
    const handleClickSeenDetail = (item) => {
        router.push(pathname + "/" + item.MaHD + "?type=0")
    }
    return (
        <table className={Styles.table}>
            <thead>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td style={{ width: "120px" }}>Mã hóa đơn</td>
                    <td style={{ width: "300px" }}>Tên khách hàng</td>
                    <td style={{ width: "200px" }}>Số điện thoại</td>
                    <td style={{ width: "300px" }}>Ngày tạo</td>
                    <td>Trạng thái</td>
                    <td style={{ width: "100px" }}>Xem chi tiết</td>
                </tr>
            </thead>

            <tbody>
                {
                    data && data[page - 1].map(item => (
                        <tr key={item.MaHD}>
                            <td><input type="checkbox" /></td>
                            <td>{item.MaHD}</td>
                            <td>{item.TenKH}</td>
                            <td>{item.SDT}</td>
                            <td>{item.NgayTao}</td>
                            <td>{item.TrangThaiHD == 1 ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                            <td style={{ cursor: "pointer" }} onClick={() => handleClickSeenDetail(item)}><FaEdit /></td>
                        </tr>
                    ))
                }


            </tbody>
        </table>
    )
}

export default BillsRepair