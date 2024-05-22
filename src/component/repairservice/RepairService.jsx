import React, { useEffect, useState } from 'react'
import Styles from './RepairService.module.css'

const RepairService = (props) => {
    const { service } = props


    return (
        <div className={Styles.container}>
            <p className={Styles.title}>Dịch vụ sửa chữa</p>
            <div className={Styles.subContainer}>
                <div className={Styles.repairLeft}>
                    <table>
                        <thead>
                            <tr>
                                <td style={{ width: "80px" }}>Mã dịch vụ</td>
                                <td>Tên dịch vụ</td>
                                <td>Phí dịch vụ</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                service && service.map(item => (
                                    <tr>
                                        <td style={{ width: "80px" }}>{item.MaSuaChua}</td>
                                        <td>{item.MoTa}</td>
                                        <td>{item.PhiSua}</td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                </div>
                <div className={Styles.repairRight}>
                    Right
                </div>
            </div>
        </div>
    )
}

export default RepairService