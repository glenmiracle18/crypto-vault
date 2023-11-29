import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const cryptoNewsHeader = {
//     'X-RapidAPI-Key': '6841f71a1fmsh6dd04032ef73ae3p1c6be1jsnc9889baca405',
// 	'X-RapidAPI-Host': 'news67.p.rapidapi.com'
// }

// const baseUrl = 'https://news67.p.rapidapi.com/v2'

// const createRequest = (url) => ({ url, headers: cryptoNewsHeader })

// export const cryptoNewsApi = createApi({
//     reducerPath: 'cryptoNewsApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     endpoints: (builder) => ({
//         getCryptoNews: builder.query({
//             query: ({ count }) => createRequest(`/crypto?batchSize=${count}`)
//         })
//     })
// });

// export const {
//     useGetCryptoNewsQuery,
// } = cryptoNewsApi;





// from newsapi.org
//  https://newsdata.io/api/1/news?apikey=pub_336892b1dbe3aa059ec390639b6899baeb994&q=crypto 
const API_Key = '124fc3d60ee743e4a18dfa660a033828'

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => ({
                url: `/everything`,
                params: {
                    q: newsCategory,
                    pageSize: count,
                    apiKey: API_Key,
                },
            }),
        }),
    }),
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;
