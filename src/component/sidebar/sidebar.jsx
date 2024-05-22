"use client"
import Link from 'next/link'
import Styles from './sidebar.module.css'
import { usePathname } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'


const menu = [
    {
        title: "TÀI KHOẢN",
        url: "/accounts",
        type: false
    },
    {
        title: "LINH KIỆN - DỊCH VỤ",
        url: "/products",
        type: true
    },
    {
        title: "DỊCH VỤ SỬA CHỮA",
        url: "/repair",
        type: false
    },
    {
        title: "NHÀ CUNG CẤP",
        url: "/manufacturer",
        type: false
    },
    {
        title: "KHÁCH HÀNG",
        url: "/customer",
        type: false
    },
    {
        title: "YÊU CẦU",
        url: "/requests",
        type: false
    },
    {
        title: "HÓA ĐƠN",
        url: "/bills",
        type: false
    },
    {
        title: "BÁO CÁO THỐNG KÊ",
        url: "/report",
        type: false
    }
]

const SideBar = () => {

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
        <div className={Styles.container} >
            <ToastContainer />
            {menu.map(item => {
                return (
                    <>
                        {item.type ?
                            <Link className={endpath == item.url ? `${Styles.link} ${Styles.active}` : Styles.link} key={item.title} href={`/admin${item.url}`} >{item.title}</Link>
                            :
                            <Link onClick={Toastify} className={endpath == item.url ? `${Styles.link} ${Styles.active}` : Styles.link} key={item.title} href={`#`} >{item.title}</Link>
                        }
                    </>
                )
            })}
        </div>
    )
}

export default SideBar