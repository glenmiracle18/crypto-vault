import React from 'react'
import { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';


const Cryptocurrencies = ({ simplified } ) => {
    const count  = simplified ? 10 : 100;
    const {data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setcryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    // verification logs
    // console.log(cryptosList?.data?.coins)
    console.log(cryptos?.[0]);

    useEffect(() => {
        const filterData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        // setter function
        setcryptos(filterData);
    }, [cryptosList, searchTerm])

    if(isFetching) return <Loader />

    return (
        <>
            {/* search bar */}
            {!simplified && (
                <div className='search-crypto'>
                    <Input 
                    placeholder='Search Cryptocurrency' 
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>  
            )}
            
            {/* coin section */}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies