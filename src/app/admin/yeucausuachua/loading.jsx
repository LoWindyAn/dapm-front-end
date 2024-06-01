import React from 'react'
import { PulseLoader } from 'react-spinners'

const loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}><PulseLoader color="#36d7b7" /></div>
    )
}

export default loading