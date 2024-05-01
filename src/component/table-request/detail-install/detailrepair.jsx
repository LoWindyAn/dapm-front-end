import { useRouter } from 'next/navigation'
import Styles from './detailinstall.module.css'
import { FaSearch, FaEdit } from "react-icons/fa";

const DetailInstall = () => {
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }
    return (
        <div>
            <p className={Styles.title} ><span onClick={handleGoBack}> &#60; </span>Yêu cầu lắp đặt #SC203</p>
            <div>
                <div className={Styles.content}>
                    <div className={Styles.contentLeft}>
                        <label htmlFor="">Tên khách hàng</label>
                        <input type="text" value="Trần Thế Anh" />
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" value="0234234234" />
                        <label htmlFor="">Địa chỉ</label>
                        <input type="text" value="04 Hồ Nghinh, Đà Nẵng" />
                        <label htmlFor="">Thiết bị cần sửa</label>
                        <input type="text" value="Laptop" />
                    </div>
                    <div className={Styles.contentRight}>
                        <button>Tiếp nhận</button>
                        <button className={Styles.btnCancel}>Hủy bỏ</button>
                        <textarea placeholder='Nhập lý do hủy ...' name="" id="" cols="40" rows="10"></textarea>
                    </div>
                </div>
                <p className={Styles.subtitle}>Danh sách linh kiện cần lắp đặt</p>
                <table className={Styles.table}>
                    <thead>
                        <tr>
                            <td>Hình ảnh</td>
                            <td>Mã sản phẩm</td>
                            <td>Tên sản phẩm</td>
                            <td>Đơn giá</td>
                            <td>Số lượng</td>
                            <td>Giá lắp đặt</td>
                            <td>Thành tiền</td>
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
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default DetailInstall