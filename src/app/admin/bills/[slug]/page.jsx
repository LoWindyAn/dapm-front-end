"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Styles from './bill.module.css'
import { FaSearch, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import AddProduct from '@/component/product/addproduct/addproduct';
import DetailInstall from '@/component/table-request/detail-install/detailrepair';
import DetailBill from '@/component/table-bills/listBillsRepair/detailBill/detailBill';

const Bill = (props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const [display, setDisplay] = useState(false);
    const [page, setPage] = useState(1)



    const type = searchParams.get("type")

    return (
        <div className={Styles.container}>
            {
                type == 0 ? (<DetailBill />) : (<DetailInstall />)
            }


        </div>
    )
}

export default Bill