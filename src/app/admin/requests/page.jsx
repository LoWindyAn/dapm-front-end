"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Styles from './requests.module.css'
import { FaSearch, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import AddProduct from '@/component/addproduct/addproduct';
import TableRepair from '@/component/table-request/table-repair/tablerepair';
import TableInstall from '@/component/table-request/table-install/tableinstall';


const dataRepair = [
    {
        id: "1",
        name: "a"
    },
    {
        id: "2",
        name: "a"
    },
    {
        id: "3",
        name: "a"
    },
    {
        id: "4",
        name: "a"
    },
    {
        id: "5",
        name: "a"
    },
    {
        id: "6",
        name: "a"
    },
    {
        id: "7",
        name: "a"
    },
    {
        id: "8",
        name: "a"
    },
    {
        id: "9",
        name: "a"
    },
    {
        id: "10",
        name: "a"
    },

    {
        id: "11",
        name: "a"
    },
    {
        id: "12",
        name: "a"
    },
    {
        id: "13",
        name: "a"
    },
    {
        id: "14",
        name: "a"
    },
    {
        id: "15",
        name: "a"
    },
    {
        id: "16",
        name: "a"
    },
    {
        id: "17",
        name: "a"
    },
    {
        id: "18",
        name: "a"
    },
    {
        id: "19",
        name: "a"
    },
    {
        id: "20",
        name: "a"
    },
    {
        id: "21",
        name: "a"
    },
    {
        id: "22",
        name: "a"
    },
    {
        id: "23",
        name: "a"
    }
]

const dataInstall = [
    {
        id: "1",
        name: "install"
    },
    {
        id: "2",
        name: "install"
    },
    {
        id: "3",
        name: "install"
    },
    {
        id: "4",
        name: "install"
    },
    {
        id: "5",
        name: "a"
    },
    {
        id: "6",
        name: "a"
    },
    {
        id: "7",
        name: "a"
    },
    {
        id: "8",
        name: "a"
    },
    {
        id: "9",
        name: "a"
    },
    {
        id: "10",
        name: "a"
    },

    {
        id: "11",
        name: "a"
    },
    {
        id: "12",
        name: "a"
    },
    {
        id: "13",
        name: "a"
    },
    {
        id: "14",
        name: "a"
    },
    {
        id: "15",
        name: "a"
    },
    {
        id: "16",
        name: "a"
    },
    {
        id: "17",
        name: "a"
    },
    {
        id: "18",
        name: "a"
    },

]

const Requests = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()

    const [display, setDisplay] = useState(false);
    const [page, setPage] = useState(1)
    const [data, setData] = useState(chunkArray(dataRepair, 7))
    const [typeRequest, setTypeRequest] = useState(0)

    const handleChanglePage = (e) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", e.target.value);
        router.push(pathname + "?" + params)
        setPage(e.target.value)
    }

    function chunkArray(arr, chunkSize) {
        const chunkedArr = [];
        let i = 0;
        const n = arr.length;

        while (i < n) {
            const chunk = arr.slice(i, i + chunkSize);
            chunkedArr.push(chunk);
            i += chunkSize;
        }

        return chunkedArr;
    }




    const handleChildDisplayChange = (newDisplay) => {
        setDisplay(newDisplay);
    };

    const handleChangeData = async (e) => {

        if (e.target.value == 1)
            setData(chunkArray(dataInstall, 7))
        else {
            setData(chunkArray(dataRepair, 7))
        }
        setTypeRequest(e.target.value)
    }

    return (
        <div className={Styles.container}>
            <p className={Styles.title}>Danh sách yêu cầu</p>
            <div className={Styles.actionbar}>
                <select className={Styles.dropdown} onChange={(e) => handleChangeData(e)}>
                    <option value="0">Sửa chữa</option>
                    <option value="1">Lắp đặt</option>
                </select>
                <div className={Styles.BoxSearch}>
                    <input type="text" placeholder='Tìm kiếm' className={Styles.inputSearch} />
                    <FaSearch className={Styles.btnSearch} size={20} />
                </div>
            </div>
            {
                typeRequest != 1
                    ?
                    (<div className={Styles.Mtable}>
                        <TableRepair data={data} page={page} />
                    </div>)
                    :
                    (<div className={Styles.Mtable}>
                        <TableInstall data={data} page={page} />
                    </div>)
            }


            <div className={Styles.pagination}>
                <button>&#60;</button>
                <ul>
                    {
                        data.map((item, index) => (
                            <li onClick={handleChanglePage} value={index + 1} className={page == (index + 1) ? Styles.active : Styles.a}>{index + 1}</li>
                        ))
                    }
                </ul>
                <button>&#62;</button>
            </div>
            <div style={!display ? { display: "none" } : { display: "" }} onClick={() => handleChildDisplayChange(!display)} className={Styles.blur}>

            </div>

            <div className={Styles.addproduct}>
                <AddProduct display={display} setDisplay={handleChildDisplayChange} />
            </div>
        </div>
    )
}

export default Requests