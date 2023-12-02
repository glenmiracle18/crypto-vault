const url = 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?timePeriod=7d';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6841f71a1fmsh6dd04032ef73ae3p1c6be1jsnc9889baca405',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}