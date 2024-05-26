"use client"
import Link from 'next/link'
import Styles from './sidebar.module.css'
import { usePathname } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'


const menu = [
    {
        title: "TÀI KHOẢN",
        url: "/accounts",
        type: false
    },
    {
        title: "NHÀ CUNG CẤP",
        url: "/manufacturer",
        type: true
    },
    {
        title: "LINH KIỆN ĐIỆN TỬ",
        url: "/products",
        type: true
    },
    {
        title: "DỊCH VỤ SỬA CHỮA",
        url: "/repair",
        type: true
    },

    {
        title: "KHÁCH HÀNG",
        url: "/customer",
        type: true
    },
    // {
    //     title: "YÊU CẦU",
    //     url: "/requests",
    //     type: false
    // },
    {
        title: "HÓA ĐƠN",
        url: "/hoadonsuachua",
        type: true
    },
    {
        title: "BÁO CÁO THỐNG KÊ",
        url: "/report",
        type: false
    }
]

const SideBar = () => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname().split('/');
    const endpath = "/" + pathname[2];

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

    return (
        <div className={Styles.container}>
            <ToastContainer />
            {menu.map(item => {
                return (
                    <div key={item.title} className={endpath == item.url ? `${Styles.listLink} ${Styles.active}` : Styles.listLink}>
                        {item.type ?
                            <Link key={item.title} className={endpath == item.url ? `${Styles.link} ${Styles.active}` : Styles.link} href={`/admin${item.url}`} >{item.title}</Link>
                            :
                            <Link onClick={Toastify} className={Styles.link} key={item.title} href={`#`} >{item.title}</Link>
                        }
                    </div>


                )
            })}
        </div>
    )
}

export default SideBar