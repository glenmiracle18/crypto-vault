import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css'

import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components';

const App = () => {
    return (
        <div className='app'>
            {/* // navbar */}
            <div className='navbar'>
                <Navbar />
            </div>

            {/* // main component */}
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Routes>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/exchanges' element={<Exchanges />} />
                            <Route path='/cryptocurrencies' element={<Cryptocurrencies simplified={false} />} />
                            <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                            <Route path='/news' element={<News />} />
                        </Routes>
                    </div>
                </Layout>

                {/* // footer */}
                <div className='footer'>
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}>
                        CryptoVault <br />
                        All rights reserved!
                    </Typography.Title>
                    <Space>
                        <Link to='/'>Home</Link>
                        <Link to='/exchanges'>Exchanges</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App