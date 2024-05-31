"use client"
import { MdOutlineMenu } from 'react-icons/md';
import Styles from './header.module.css'
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const Header = () => {
    const [user, setUser] = useState({
        HoVaTen: '',
        VaiTro: '',
        Avatar: 'https://static.thenounproject.com/png/363640-200.png'
    })
    const [isMenu, setIsMenu] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const getUser = () => {
            return JSON.parse(localStorage.getItem('user'));
        }
        const userr = getUser()

        if (userr) {
            setUser(userr)
        } else {
            router.push('/login')
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login')
    }

    const openMenu = () => {
        setIsMenu(!isMenu)
    }

    const handleAdmin = () => {
        router.push('/admin')
    }
    return (
        <div className={Styles.container} >
            <div className={Styles.header_left} onClick={openMenu}>
                {user && <>
                    <Image className={Styles.image}
                        src='https://static.thenounproject.com/png/363640-200.png'
                        alt='' width={50} height={50} />
                    <div className={Styles.inforStaff}>
                        <p>{user.HoVaTen}</p>
                        <p>{user.VaiTro == 'admin' ? 'Admin' : user.VaiTro == 'ktv' ? 'Kỹ thuật viên' : 'Nhân viên seller'}</p>
                    </div>
                </>}
                <ul className={isMenu ? `${Styles.menu} ${Styles.active}` : `${Styles.menu}`}>
                    <li>Thông tin cá nhân</li>
                    <li onClick={handleLogout}>Đăng xuất</li>
                </ul>
            </div>
            <div className={Styles.header_right} onClick={handleAdmin}>
                {/* <MdOutlineMenu color='white' size={40} /> */}
                <p>QUẢN LÝ SỬA CHỮA VÀ LẮP ĐẶT LINH KIỆN ĐIỆN – ĐIỆN TỬ</p>
            </div >

        </div >
    )
}

export default Header