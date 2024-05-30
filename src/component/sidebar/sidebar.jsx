"use client"
import Link from 'next/link'
import Styles from './sidebar.module.css'
import { usePathname } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react'


const menu = [
    {
        title: "TÀI KHOẢN",
        url: "/accounts",
        type: false,
        role: ['admin']
    },
    {
        title: "NHÀ CUNG CẤP",
        url: "/manufacturer",
        type: true,
        role: ['admin']
    },
    {
        title: "LINH KIỆN ĐIỆN TỬ",
        url: "/products",
        type: true,
        role: ['admin']
    },
    {
        title: "DỊCH VỤ SỬA CHỮA",
        url: "/repair",
        type: true,
        role: ['admin']
    },

    {
        title: "KHÁCH HÀNG",
        url: "/customer",
        type: true,
        role: ['admin']
    },
    // {
    //     title: "YÊU CẦU",
    //     url: "/requests",
    //     type: false
    // },
    {
        title: "HÓA ĐƠN SỬA CHỮA",
        url: "/hoadonsuachua",
        type: true,
        role: ['admin', 'ktv', 'sale']
    },
    {
        title: "HÓA ĐƠN LẮP ĐẶT",
        url: "/hoadonlapdat",
        type: true,
        role: ['admin', 'ktv', 'sale']
    },
    {
        title: "THỐNG KÊ",
        url: "/report",
        type: true,
        role: ['admin']
    }
]

const SideBar = () => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname().split('/');
    const endpath = "/" + pathname[2];
    const [user, setUser] = useState({
        HoVaTen: '',
        VaiTro: '',
        Avatar: 'https://static.thenounproject.com/png/363640-200.png'
    })

    const Toastify = () => {
        toast.info('Chức năng đang phát triển!', {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        toast()
    }

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


    return (
        <div className={Styles.container}>
            <ToastContainer />
            {menu.map(item => {
                // Kiểm tra vai trò của người dùng trước khi hiển thị mục menu
                if (item.role.includes(user.VaiTro)) {
                    return (
                        <div key={item.title} className={endpath == item.url ? `${Styles.listLink} ${Styles.active}` : Styles.listLink}>
                            {item.type ?
                                <Link key={item.title} className={endpath == item.url ? `${Styles.link} ${Styles.active}` : Styles.link} href={`/admin${item.url}`} >{item.title}</Link>
                                :
                                <Link onClick={Toastify} className={Styles.link} key={item.title} href={`#`} >{item.title}</Link>
                            }
                        </div>
                    )
                }
                return null;
            })}
        </div>
    )
}

export default SideBar