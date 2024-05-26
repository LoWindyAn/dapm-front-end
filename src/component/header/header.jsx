import { MdOutlineMenu } from 'react-icons/md';
import Styles from './header.module.css'
import Image from 'next/image';
const Header = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.header_left}>
                <Image className={Styles.image}
                    src='https://cdn.thoitiet247.edu.vn/wp-content/uploads/2024/03/avatar-xam-1.jpg'
                    alt='' width={50} height={50} />
                <div className={Styles.inforStaff}>
                    <p>Quốc Sang</p>
                    <p>Admin</p>
                </div>
            </div>
            <div className={Styles.header_right}>
                {/* <MdOutlineMenu color='white' size={40} /> */}
                <p>QUẢN LÝ SỬA CHỮA VÀ LẮP ĐẶT LINH KIỆN ĐIỆN – ĐIỆN TỬ</p>
            </div >
        </div >
    )
}

export default Header