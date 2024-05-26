"use client"
import { ChangeEvent, useState } from 'react'
import Styles from './login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const LoginPage = () => {

    const [infoLogin, setInfoLogin] = useState({
        username: "",
        password: ""
    });
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

    const handleSubmit = async () => {

        // const res = await axios.post('http://localhost:3500/login', infoLogin)
        // if (res.status == 200) {
        redirect('./admin')
        // }
        // console.log(res);

    }
    return (
        <div className={Styles.container}>

            <form action={handleSubmit} className={Styles.form}>
                <p className={Styles.title}>Staff Login</p>
                <input type="text" name='username' onChange={(e) => handleOnchange(e)} value={infoLogin.username} className={Styles.input} placeholder="username" />
                <input type={tipe ? "text" : "password"} name='password' onChange={(e) => handleOnchange(e)} value={infoLogin.password} className={Styles.input} placeholder="password" />
                {tipe ? <FaEye className={Styles.eye} onClick={ChangeTipe} /> : <FaEyeSlash className={Styles.eye} onClick={ChangeTipe} />}
                <button type='submit' className={`${Styles.button}`}>Login</button>
            </form>
            <p>{logins}</p>

        </div>
    )
}

export default LoginPage