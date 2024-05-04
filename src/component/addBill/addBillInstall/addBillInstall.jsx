import Image from 'next/image'
import Styles from './addBillInstall.module.css'
import { useState } from 'react';
import axios from 'axios';
import { FiMinusCircle } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
const products = [
    {
        id: 1,
        name: 'Ổ cứng',
        price: 125000
    },
    {
        id: 2,
        name: 'Ram 4Gb',
        price: 10000
    },
    {
        id: 3,
        name: 'Ổ mềm',
        price: 25000
    },
    {
        id: 4,
        name: 'Ổ cứng H1',
        price: 1250000
    },
    {
        id: 5,
        name: 'Không Ổ cứng',
        price: 15000
    },
    {
        id: 6,
        name: 'Diot',
        price: 12000
    },
    {
        id: 7,
        name: 'Ổ cứng HHD',
        price: 1250
    },
    {
        id: 8,
        name: 'Chip legen',
        price: 15300
    }
]


const AddBillInstall = ({ display, setDisplay }) => {
    const [lProducts, setLProducts] = useState([])
    const [data, setData] = useState(products)

    const handleClickPlus = () => {
        setLProducts((prevItems) => [...prevItems, {
            item: data[0],
            quantity: 1
        }])
    }

    const handleChangeOption = (index, option) => {

        const newArr = lProducts.map((item, i) => {
            if (index == i)
                return {
                    ...item,
                    item: data[option]
                }
            else
                return item
        })

        setLProducts(newArr)
    }


    const handleOnchangeQuantity = (index, quantity) => {

        const newArr = lProducts.map((item, i) => {
            if (index == i)
                return {
                    ...item,
                    quantity: Number(quantity)
                }
            else
                return item
        })

        setLProducts(newArr)
    }


    const handleOnClickHuy = () => {
        setDisplay(!display)
    }

    const handleDelete = (index) => {
        setLProducts(prevItems => prevItems.filter((item, i) => i != index))
    }


    return (
        <div className={Styles.container} style={!display ? { display: "none" } : { display: "" }}>
            <p>Tạo đơn lắp đặt</p>
            <div className={Styles.content}>
                <div className={Styles.part2M}>
                    <label htmlFor="">Tên khách hàng</label>
                    <input type="text" />
                </div>
                <div className={Styles.part2M}>
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" />
                </div>
                <div className={Styles.part2M}>
                    <label htmlFor="">Thiết bị cần lắp đặt</label>
                    <input type="text" />
                </div>
                <div className={Styles.listProduct}>
                    <table>
                        <thead>
                            <tr>
                                <td >Linh kiện lắp</td>
                                <td style={{ width: "100px" }}>Đơn giá</td>
                                <td style={{ width: "80px" }}>Số lượng</td>
                                <td style={{ width: "50px" }}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lProducts.length > 0 && lProducts.map((pr, index) => (
                                    <tr>
                                        <td>
                                            <select onChange={(e) => handleChangeOption(index, e.target.value - 1)} value={pr.item.id} name="product" id="">
                                                {data.map(item => (
                                                    <option value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>{pr.item.price}</td>
                                        <td><input onChange={(e) => handleOnchangeQuantity(index, e.target.value)} type="text" value={pr.quantity} /></td>
                                        <td onClick={() => handleDelete(index)}><FiMinusCircle /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tr ><FaPlus onClick={handleClickPlus} style={{ marginTop: "20px" }} /></tr>
                    </table>
                </div>
            </div>
            <div className={Styles.end}>
                <button onClick={handleOnClickHuy}>Hủy</button>
                <button >Tạo</button>

            </div>
        </div>
    )
}

export default AddBillInstall