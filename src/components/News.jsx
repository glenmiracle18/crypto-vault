import React from 'react';
import { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import { cryptoNewsApi, useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

import Title from 'antd/es/skeleton/Title';

const News = ({ simplified }) => {
    const [loading, setLoading] = useState(true);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ 
        count: simplified ? 6 : 12,
    });

    useEffect(() => {
        if (cryptoNews) {
            setLoading(false);
        }
    }, [cryptoNews]);

    console.log(cryptoNews);

    const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

    if (loading) return 'Loading...';    
    if (!cryptoNews?.news) return 'Loading News Items...'


    return (
        <Row gutter={[24, 24]}>
            {cryptoNews?.news.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.Url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {news.Title}
                                </Title>
                                <img src={news?.Image || demoImage} alt="" />
                            </div>
                            <p>
                                {news?.Description > 100 
                                    ? `${news?.Description.substring(0, 100)}...`
                                    : news?.Description
                                }
                            </p>
                        </a>
                        </Card>
                </Col>
            ))}
        </Row>
    )

}


export default News