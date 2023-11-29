import React from 'react';
import { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import { cryptoNewsApi, useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'


const News = ({ simplified }) => {
    const {data} = useGetCryptosQuery(100);

    const [newsCategory, setnewsCategory] = useState()
    const [loading, setLoading] = useState(true);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ 
        newsCategory,
        count: simplified ? 6 : 15,
    });

    useEffect(() => {
        if (cryptoNews) {
            setLoading(false);
        }
    }, [cryptoNews]);

    console.log(cryptoNews);


    if (loading) return 'Loading...';    
    if (!cryptoNews?.news) return 'Loading News Items...'


    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                    showSearch
                    className='select-news'
                    placeholder='Select a Crypto'
                    optionFilterProp='children'
                    onChange={(value) => setnewsCategory(value)}
                    filterOption={(input, option) => option.children.towerCase().indexOf(input.toLowerCase())}
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}

            {cryptoNews?.news.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.Url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                {news?.Title.lenght > 10 
                                    ? `${news?.Title.substring(0, 10)}...`
                                    : news?.Title
                                }
                                </Title>
                                <img style={{ maxWidth: '100px', maxHeight: '100px'}} src={news?.Image || demoImage} alt="" />
                            </div>
                            <p>
                                {news?.Summary.lenght > 100 
                                    ? `${news?.Summary.substring(0, 100)}...`
                                    : news?.Summary
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.Source[0]?.Image} />
                                    <Text className="provider-name">{news.Source}</Text>  
                                </div>
                                <div>
                                    <Text>{moment(news?.PublishedOn).startOf('ss').fromNow()}</Text>
                                </div>
                            </div>
                        </a>
                        </Card>
                </Col>
            ))}
        </Row>
    )

}


export default News