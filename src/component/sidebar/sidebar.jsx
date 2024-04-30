"use client"
import Link from 'next/link'
import Styles from './sidebar.module.css'
import { usePathname } from 'next/navigation'


const menu = [
    {
        title: "TÀI KHOẢN",
        url: "/accounts"
    },
    {
        title: "LINH KIỆN ĐIỆN TỬ",
        url: "/products"
    },
    {
        title: "YÊU CẦU",
        url: "/requests"
    },
    {
        title: "HÓA ĐƠN",
        url: "/bills"
    },
    {
        title: "BÁO CÁO THỐNG KÊ",
        url: "/report"
    }
]

const SideBar = () => {

    const pathname = usePathname().split('/');
    const endpath = "/" + pathname[pathname.length - 1];

    return (
        <div className={Styles.container}>
            {menu.map(item => (
                <Link className={endpath == item.url ? `${Styles.link} ${Styles.active}` : Styles.link} key={item.title} href={`/admin${item.url}`} >{item.title}</Link>
            ))}
        </div>
    )
}

export default SideBar