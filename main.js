// import { apiKey } from './key.js';
const apiKey = 'REPLACE_WITH_NETLIFY_API_KEY';
const apiUrl =
	'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const pollutionApi = 'https://api.openweathermap.org/data/2.5/air_pollution?';
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const pollution = document.querySelector('.pollution');
async function getWeather(city) {
	if (city == '') {
		const error = document.querySelector('.error');
		document.querySelector('.error').innerHTML = 'Please enter city name.';
		error.style.display = 'block';
	} else {
		const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
		const data = await response.json();
		const lat = data.coord.lat;
		const lon = data.coord.lon;

		const pollutionResponse = await fetch(
			`${pollutionApi}lat=${lat}&lon=${lon}&appid=${apiKey}`
		);
		const pollutionData = await pollutionResponse.json();
		const aqi = pollutionData.list[0].main.aqi;
		if (response.status == 404 || pollutionResponse.status == 404) {
			document.querySelector('.error').style.display = 'block';
			document.querySelector('.weather').style.display = 'none';
		} else {
			document.querySelector('.city').innerHTML = data.name;
			document.querySelector('.temp').innerHTML =
				Math.round(data.main.temp) + ' °C';
			document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
			document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
			const weatherCondition = data.weather[0].main;
			switch (weatherCondition) {
				case 'Clouds':
					weatherIcon.src = 'resource/images/clouds.png';
					break;
				case 'Rain':
					weatherIcon.src = 'resource/images/rain.png';
					break;
				case 'Clear':
					weatherIcon.src = 'resource/images/clear.png';
					break;
				case 'Mist':
					weatherIcon.src = 'resource/images/mist.png';
					break;
				case 'Drizzle':
					weatherIcon.src = 'resource/images/drizzle.png';
					break;

				default:
					break;
			}
			switch (aqi) {
				case 1:
					pollution.innerHTML = `AQI-${aqi} Excellent`;
					break;
				case 2:
					pollution.innerHTML = `AQI-${aqi} Good`;
					break;
				case 3:
					pollution.innerHTML = `AQI-${aqi} Lightly polluted`;
					break;
				case 4:
					pollution.innerHTML = `AQI-${aqi} Moderatory polluted`;
					break;
				case 5:
					pollution.innerHTML = `AQI-${aqi} Heavily polluted`;
					break;
				case 6:
					pollution.innerHTML = `AQI-${aqi} Severely polluted`;
					break;

				default:
					break;
			}
			document.querySelector('.weather').style.display = 'block';
			document.querySelector('.error').style.display = 'none';
		}
	}
}
searchInput.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		getWeather(searchInput.value);
	}
});
searchBtn.addEventListener('click', () => {
	getWeather(searchInput.value);
});
