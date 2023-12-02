import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// working key
// 'X-RapidAPI-Key': '59ca451293mshe8e912ebacabcabp120dc2jsnf8b1eab19b60'

const cryptoNewsHeader = {
    'X-RapidAPI-Key': '59ca451293mshe8e912ebacabcabp120dc2jsnf8b1eab19b60',
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
