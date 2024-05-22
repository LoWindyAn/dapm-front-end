import Image from 'next/image'
import Styles from './addproduct.module.css'
import { useEffect, useState } from 'react';
import cloudinary from 'cloudinary'
import config from '@/cloudinary.config'
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader"
import { RingLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';

cloudinary.config(config)

const AddProduct = (props) => {
    const { display, setDisplay, categories, setIsSubmit } = props
    const [imageURL, setImageURL] = useState('');
    const [image, setImage] = useState(null);
    const [publicId, setPublicId] = useState('')
    const [loadSubmit, setLoadSubmit] = useState(false)
    const [product, setProduct] = useState({
        "MaSP": "",
        "TenSP": "",
        "MoTa": "",
        "DonGia": 0,
        "PhiLapDat": 0,
        "SoLuongCon": 0,
        "HinhAnh": "",
        "MaNCC": "NCC00002",
        "MaLoai": "LLK00001"
    })

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
            await setProduct({
                ...product,
                ['HinhAnh']: response.data.secure_url
            })
            await setPublicId(response.data.public_id)
            return response.data.secure_url
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnClickHuy = () => {
        setDisplay(!display)
        setImageURL('')
        setProduct({
            "MaSP": "",
            "TenSP": "",
            "MoTa": "",
            "DonGia": 0,
            "PhiLapDat": 0,
            "SoLuongCon": 0,
            "HinhAnh": "",
            "MaNCC": "NCC00002",
            "MaLoai": "LLK00001"
        })
    }

    const handleChangeProduct = (e) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        if (!product.MaSP || !product.TenSP || !product.MoTa || !product.DonGia || !product.PhiLapDat || !product.SoLuongCon || !image) {
            toast.error('Vui lòng nhập đủ thông tin linh kiện!', {
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
        } else {
            setLoadSubmit(true)
            const HinhAnh = await upLoadfile()
            const res = await axios.post('http://localhost:3500/products/', {
                MaSP: product.MaSP,
                TenSP: product.TenSP,
                MoTa: product.MoTa,
                DonGia: product.DonGia,
                PhiLapDat: product.PhiLapDat,
                SoLuongCon: product.SoLuongCon,
                HinhAnh: HinhAnh,
                MaNCC: product.MaNCC,
                MaLoai: product.MaLoai
            });
            setIsSubmit(true)
            setProduct({
                "MaSP": "",
                "TenSP": "",
                "MoTa": "",
                "DonGia": '',
                "PhiLapDat": '',
                "SoLuongCon": '',
                "HinhAnh": "",
                "MaNCC": "NCC00002",
                "MaLoai": "LLK00001"
            })
            setLoadSubmit(false)
            setDisplay(!display)
        }
    }

    return (
        <div className={Styles.container} style={!display ? { display: "none" } : { display: "" }}>
            <p>Thêm linh kiện</p>
            <div className={Styles.content}>
                <div className={Styles.part1}>
                    <Image className={Styles.img} src={imageURL} width={100} height={80} alt='Chọn hình ảnh linh kiện' />
                    <div className={Styles.category}>
                        <p>Loại linh kiện</p>
                        <select name="MaLoai" onChange={handleChangeProduct}>
                            {
                                categories && categories.map(cat => (
                                    <option value={cat.MaLoai}>{cat.TenLoai}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className={Styles.part2}>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Mã linh kiện</label>
                        <input style={{ width: '100px' }} name="MaSP" type="text" value={product.MaSP} onChange={handleChangeProduct} />
                    </div>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Tên linh kiện</label>
                        <input style={{ width: '310px' }} name="TenSP" type="text" value={product.TenSP} onChange={handleChangeProduct} />
                    </div>
                </div>
                <div className={Styles.part3}>
                    <label htmlFor="">Mô tả</label>
                    <textarea name="MoTa" value={product.MoTa} onChange={handleChangeProduct} id=""></textarea>
                </div>
                <div className={Styles.part2}>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Đơn giá</label>
                        <input name="DonGia" type="number" value={product.DonGia} onChange={handleChangeProduct} />
                    </div>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Giá lắp đặt</label>
                        <input name="PhiLapDat" type="number" value={product.PhiLapDat} onChange={handleChangeProduct} />
                    </div>
                </div>
                <div className={Styles.part2}>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Số lượng</label>
                        <input name="SoLuongCon" type="number" value={product.SoLuongCon} onChange={handleChangeProduct} />
                    </div>
                    <div className={Styles.part2M}>
                        <label htmlFor="">Hình ảnh</label>
                        <input accept="image/*" onChange={handleImageChange} style={{ height: "20px", margin: "3px 0" }} type="file" />
                    </div>
                </div>
            </div>
            <div className={Styles.end}>
                <button onClick={handleOnClickHuy}>Hủy</button>
                <button onClick={handleSubmit}>Thêm</button>
            </div>
            {
                loadSubmit &&
                <div className={Styles.HashLoader}>
                    <RingLoader color="#1802ff" size={100} />
                </div>
            }

        </div>

    )
}

export default AddProduct