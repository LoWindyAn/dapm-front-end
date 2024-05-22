import { usePathname, useRouter } from 'next/navigation'
import Styles from './detailBill.module.css'
import { useState } from 'react'

const billRp = {
    idHD: "HD001",
    tenKH: "Trần Thế Anh",
    SDT: "0234234234",
    DiaChi: "58 Hồ Nghinh, Đà Nẵng",
    thietbi: "Laptop",
    mota: "Bị rơi, mở không lên",
    ngaytao: "05-04-2024",
    idLHD: 1,
    idTTHD: 1,
    idTD: 1,
    thanhtien: 325000,
    CTSC: [
        {
            idSP: 1,
            tenSP: "Ram 4Gb",
            donGia: 125000,
            suco: "Hỏng ram",
            cachkhacphuc: "Thay Ram"
        },
        {
            idSP: '',
            tenSP: "Ổ cứng HHD",
            donGia: 200000,
            suco: "Hỏng ổ cứng",
            cachkhacphuc: "Sửa ổ cứng"
        }
    ]

}

const DetailBill = () => {

    const router = useRouter()
    const idHd = usePathname().split("/").pop()
    const [detail, setDetail] = useState(billRp)

    const handleGoBack = () => {
        router.back()
    }
    return (
        <div>
            <p className={Styles.title} ><span onClick={handleGoBack}> &#60; </span>Chi tiết hóa đơn sửa chữa #{idHd}</p>
            <div className={Styles.content}>
                <div className={Styles.button}>
                    <button>Cập nhật</button>
                    <button>Xuất hóa đơn</button>
                </div>
                <div className={Styles.infor}>
                    <ul className={Styles.ulFirst}>
                        <li>Tên:{detail.tenKH}</li>
                        <li>Số điện thoại: {detail.SDT}</li>
                        <li>Ngày tạo: {detail.ngaytao}</li>
                        <li>Kỹ thuật viên:</li>
                        <li>Nhân viên thanh toán:</li>
                    </ul >
                    <ul className={Styles.ulSecond}>
                        <li>Thiết bị cần sửa: {detail.thietbi}</li>
                        <li>Địa chỉ: {detail.DiaChi}</li>
                        <li>Trạng thái: {detail.idTD == 1 ? 'Chưa thanh toán' : 'Đã thanh toán'}</li>
                        <li>Loại hóa đơn: {detail.idLHD == 1 ? 'Online' : 'Offline'}</li>
                        <li>Tiến độ: {detail.idTD == 1 ? "Chưa" : detail.idTD == 2 ? 'Đan sửa' : "Hoàn thành"}</li>
                    </ul>
                </div>
                <p>Danh sách linh kiện</p>
                <table className={Styles.table}>
                    <thead>
                        <tr>
                            <td>STT</td>
                            <td>Sự cố</td>
                            <td>Cách khắc phục</td>
                            <td>Linh kiện thay</td>
                            <td>Số tiền</td>
                        </tr>
                    </thead>
                    <tbody>
                        {detail.CTSC.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.suco}</td>
                                <td>{item.cachkhacphuc}</td>
                                <td>{item.tenSP}</td>
                                <td>{item.donGia}</td>
                            </tr>

                        ))}
                        <tr>
                            <td colSpan={4}>Thành tiền</td>
                            <td>{detail.thanhtien}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DetailBill