import Image from 'next/image'
import Styles from './addBillRepair.module.css'
import { useState } from 'react';
import cloudinary from 'cloudinary'
import config from '@/cloudinary.config'
import axios from 'axios';

cloudinary.config(config)

const AddBillRepair = ({ display, setDisplay }) => {
    const [imageURL, setImageURL] = useState('');
    const [image, setImage] = useState('');
    const [publicId, setPublicId] = useState('')

    const handleOnClickHuy = () => {
        setDisplay(!display)
        setImageURL('')
    }

    return (
        <div className={Styles.container} style={!display ? { display: "none" } : { display: "" }}>
            <p>Tạo đơn sửa chữa</p>
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
                    <label htmlFor="">Thiết bị cần sửa</label>
                    <input type="text" />
                </div>
                <label htmlFor="">Mô tả vấn đề</label>
                <textarea value={imageURL} name="" id="" rows={4}></textarea>
            </div>
            <div className={Styles.end}>
                <button onClick={handleOnClickHuy}>Hủy</button>
                <button >Thêm</button>

            </div>
        </div>
    )
}

export default AddBillRepair