import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
    const [activeMenu, setactiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)
    // Function to check the screen size and change menu visibility accordingly

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)

        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if(screenSize < 768) {
            setactiveMenu(false);
        } else {
            setactiveMenu(true);
        }
    }, [screenSize])

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to='./'>CrypoVault</Link>
                </Typography.Title>

                {/* for mobile */}
                <Button className='menu-control-container' onClick={() => setactiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme='#5ac40e'>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to='./' className='menu-link'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to='./cryptocurrencies' className='menu-link'>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to='./exchanges' className='menu-link'>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to='./news' className='menu-link'>News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    )
}

export default Navbar