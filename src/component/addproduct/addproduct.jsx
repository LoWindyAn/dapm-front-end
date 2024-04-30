import Image from 'next/image'
import Styles from './addproduct.module.css'
import { useState } from 'react';
import cloudinary from 'cloudinary'
import config from '@/cloudinary.config'
import axios from 'axios';

cloudinary.config(config)

const AddProduct = ({ display, setDisplay }) => {
    const [imageURL, setImageURL] = useState('');
    const [image, setImage] = useState('');
    const [publicId, setPublicId] = useState('')

    const handleImageChange = (e) => {

        const imageFile = e.target.files[0];
        const reader = new FileReader();
        setImage(imageFile)
        reader.onload = async (e) => {
            const imageURLL = e.target.result;

            await setImageURL(imageURLL);
        };

        reader.readAsDataURL(imageFile);
    };

    const upLoadfile = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'frontenddapm');
        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/' + config.cloud_name + '/image/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            await setImageURL(response.data.secure_url);
            await setPublicId(response.data.public_id)
            console.log("uploaded")
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnClickHuy = () => {
        setDisplay(!display)
        setImageURL('')
    }

    return (
        <div className={Styles.container} style={!display ? { display: "none" } : { display: "" }}>
            <p>Thêm linh kiện</p>
            <div className={Styles.content}>
                <div className={Styles.part1}>
                    <Image className={Styles.img} src={imageURL ? imageURL : ""} width={100} height={80} alt='Chọn hình ảnh linh kiện' />
                    <div className={Styles.category}>
                        <p>Loại linh kiện</p>
                        <select name="" id="">
                            <option value="1">Ổ cứng</option>
                            <option value="2">Ram</option>
                            <option value="3">Chip</option>
                            <option value="4">Làm mát</option>
                        </select>
                    </div>
                </div>
                <div className={Styles.part2}>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Mã sản phẩm</label>
                        <input type="text" />
                    </div>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Tên sản phẩm</label>
                        <input type="text" />
                    </div>
                </div>
                <div className={Styles.part3}>
                    <label htmlFor="">Mô tả</label>
                    {/* <input type="text" /> */}
                    <textarea value={imageURL} name="" id=""></textarea>
                </div>
                <div className={Styles.part2}>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Đơn giá</label>
                        <input type="text" />
                    </div>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Giá lắp đặt</label>
                        <input type="text" />
                    </div>
                </div>
                <div className={Styles.part2}>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Số lượng</label>
                        <input type="text" />
                    </div>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Hình ảnh</label>
                        <input accept="image/*" onChange={handleImageChange} style={{ height: "20px", margin: "3px 0" }} type="file" />
                    </div>
                </div>
            </div>
            <div className={Styles.end}>
                <button onClick={handleOnClickHuy}>Hủy</button>
                <button onClick={upLoadfile}>Thêm</button>
                <button onClick={deleteImage}>Xóa</button>

            </div>
        </div>
    )
}

export default AddProduct