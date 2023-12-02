import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { createActionCreatorInvariantMiddleware } from '@reduxjs/toolkit';
import Loader from './Loader';


const { Text, Title } = Typography;
const { Option } = Select;


const CryptoDetails = () => {
    const [timePeriod, settimePeriod] = useState('7d');
    const { coinId } = useParams();
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const { data: coinHistory} = useGetCryptoHistoryQuery({ coinId, timePeriod})
    const cryptoDetails = data?.data?.coin;
    

    if(isFetching) return <Loader />
    console.log(`Coin History:  ${coinHistory}`)

    // main array data
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];


    const stats = [
        { 
            title: 'Price to USD', 
            value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, 
            icon: <DollarCircleOutlined /> 
        },
        { 
            title: 'Rank', 
            value: cryptoDetails?.rank, 
            icon: <NumberOutlined /> 
        },
        { 
            title: '24h Volume', 
            value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, 
            icon: <ThunderboltOutlined /> 
        },
        { 
            title: 'Market Cap', 
            value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, 
            icon: <DollarCircleOutlined /> 
        },
        { 
            title: 'All-time-high(daily avg.)', 
            value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, 
            icon: <TrophyOutlined /> 
        },
    ];

    const genericStats = [
        { 
            title: 'Number Of Markets', 
            value: cryptoDetails?.numberOfMarkets, 
            icon: <FundOutlined /> 
        },
        { 
            title: 'Number Of Exchanges', 
            value: cryptoDetails?.numberOfExchanges, 
            icon: <MoneyCollectOutlined /> },
        { 
            title: 'Aprroved Supply', 
            value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, 
            icon: <ExclamationCircleOutlined /> },
        { 
            title: 'Total Supply', 
            value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, 
            icon: <ExclamationCircleOutlined /> },
        { 
            title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, 
            icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title className='coin-name' level={2}>
                    {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
                </Title>
                <p>
                    Live {cryptoDetails?.name} price in US dollars. 
                    Explore price statistics, market capitalization, and supply.
                </p>
                <Select
                    defaultValue='7d'
                    className='select-timeperiod'
                    placeholder='Select Time Period'
                    onChange={(value) => settimePeriod(value)}
                >
                    {time.map((date) => <Option Key={date}>{date}</Option>)}
                </Select>

                {/* Line chart */}
                <LineChart 
                    coinHistory={coinHistory} 
                    currentPrice={millify(cryptoDetails.price)}
                    coinName={cryptoDetails?.name}
                >
                </LineChart>

                <Col className='stats-container'>
                    <Col className='coin-value-statistics'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-details'>
                                {cryptoDetails?.name} Value statistics
                            </Title>
                            <p>
                                An overview showing the stats of all Cryptocurrencies
                            </p>
                        </Col>
                        {stats.map(( {icon, title, value }) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Col>
                                    <Text className='stats'>{value}</Text>
                                </Col>
                            </Col>
                        ))}
                    </Col>

                    <Col className='coin-value-statistics'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-details'>
                                Other Crypto statistics
                            </Title>
                            <p>
                                An overview showing the stats of all Cryptocurrencies
                            </p>
                        </Col>
                        {genericStats.map(( {icon, title, value }) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Col>
                                    <Text className='stats'>{value}</Text>
                                </Col>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className='coin-desc-link'>
                    <Row className='coin-desc'>
                        <Title className='coin-details-heading' level={3}>
                            What is {cryptoDetails?.name}?
                            <br></br>
                            <Title level={4} className='coin-details'>
                                {HTMLReactParser(String(cryptoDetails?.description))}
                            </Title>
                            
                        </Title>
                    </Row>
                    <Col className='coin-links'>
                        <Title level={3} className='coin-details-heading'>
                            {cryptoDetails?.name} Links
                        </Title>
                        {cryptoDetails?.links?.map((link) => (
                            <Row className='coin-link' key={link.name}>
                                <Title level={5} className='link-name'>
                                    {link.type}
                                </Title>
                                <a href={link.url} target='_blank' rel='noreferrer'>
                                    {link.name}
                                </a>
                            </Row>
                        ))}
                    </Col>
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails