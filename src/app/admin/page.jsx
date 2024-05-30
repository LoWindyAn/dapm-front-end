"use client"
import { useEffect } from 'react';
import Styles from './admin.module.css'
import { useRouter } from 'next/navigation';
const AdminPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra thông tin đăng nhập từ cookie
        // const user = Cookies.get('user');
        // Hoặc từ localStorage
        const user = localStorage.getItem('user');

        if (!user) {
            router.push('/login');
        }
    }, []);
    return (

        <div className={Styles.container}>
            <p>TRANG QUẢN LÝ DỊCH VỤ SỬA CHỮA VÀ LẮP ĐẶT</p>
            <p>LINH KIỆN ĐIỆN - ĐIỆN TỬ</p>
            <p> DANA COMPANY</p>
        </div>
    )
}

export default AdminPage