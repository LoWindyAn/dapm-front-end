"use client"
import { ChangeEvent, useEffect, useState } from 'react'
import Styles from './login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const router = useRouter()

    const [infoLogin, setInfoLogin] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (user) {
            router.push('/admin');
        }
    }, []);

    const [logins, setLogins] = useState('')
    const [tipe, setTipe] = useState(false)

    const handleOnchange = (e) => {
        setInfoLogin(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const ChangeTipe = () => {
        setTipe(!tipe)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3500/login', infoLogin);
            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                toast.success("Đăng nhập thành công!");
                router.push('/admin');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLogins("Tên đăng nhập hoặc mật khẩu không đúng.");
            } else {
                setLogins("Tên đăng nhập hoặc mật khẩu không đúng.");
            }
        }
    }

    return (
        <div className={Styles.container}>
            <form onSubmit={handleSubmit} className={Styles.form}>
                <p className={Styles.title}>Đăng nhập</p>
                <input
                    type="text"
                    name='username'
                    onChange={handleOnchange}
                    value={infoLogin.username}
                    className={Styles.input}
                    placeholder="Tên đăng nhập"
                />
                <div className={Styles.password}>
                    <input
                        type={tipe ? "text" : "password"}
                        name='password'
                        onChange={handleOnchange}
                        value={infoLogin.password}
                        className={Styles.input}
                        placeholder="Mật khẩu"
                    />
                    {tipe ? <FaEye className={Styles.eye} onClick={ChangeTipe} /> : <FaEyeSlash className={Styles.eye} onClick={ChangeTipe} />}
                </div>
                {logins && <p className={Styles.error}>{logins}</p>}
                <button type='submit' className={`${Styles.button}`}>Đăng nhập</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default LoginPage
