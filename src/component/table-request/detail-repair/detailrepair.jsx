import { useRouter } from 'next/navigation'
import Styles from './detailrepair.module.css'

const DetailRepair = () => {
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }
    return (
        <div>
            <p className={Styles.title} ><span onClick={handleGoBack}> &#60; </span>Yêu cầu sửa chữa #SC203</p>
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
                    <label htmlFor="">Mô tả tình trạng</label>
                    <input type="text" value="Máy rơi, mở không lên" />
                </div>
                <div className={Styles.contentRight}>
                    <button>Tiếp nhận</button>
                    <button className={Styles.btnCancel}>Hủy bỏ</button>
                    <textarea placeholder='Nhập lý do hủy ...' name="" id="" cols="40" rows="10"></textarea>
                </div>
            </div>
        </div>
    )
}

export default DetailRepair