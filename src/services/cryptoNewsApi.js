import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeader = {
    'X-RapidAPI-Key': '93b2b49f97mshe6af848f7a5c522p131ffbjsn27c2d33c6398',
	'X-RapidAPI-Host': 'news67.p.rapidapi.com'
}

const baseUrl = 'https://news67.p.rapidapi.com/v2'

const createRequest = (url) => ({ url, headers: cryptoNewsHeader })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ count, newsCategory }) => createRequest(`/topic-search?batchSize=${count}&languages=en&search=${newsCategory}`)
        })
    })
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;





// from newsapi.org
//  https://newsdata.io/api/1/news?apikey=pub_336892b1dbe3aa059ec390639b6899baeb994&q=crypto 
// const API_Key = '124fc3d60ee743e4a18dfa660a033828'

// export const cryptoNewsApi = createApi({
//     reducerPath: 'cryptoNewsApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' }),
//     endpoints: (builder) => ({
//         getCryptoNews: builder.query({
//             query: ({ newsCategory, count }) => ({
//                 url: `/everything`,
//                 params: {
//                     q: newsCategory,
//                     pageSize: count,
//                     apiKey: API_Key,
//                 },
//             }),
//         }),
//     }),
// });

// export const {
//     useGetCryptoNewsQuery,
// } = cryptoNewsApi;
