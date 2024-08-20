document.getElementById('search-button').addEventListener('click', async function () {
    const city = document.getElementById('search').value;
    if (city){
        const apiKey = 'c1bef2255a1171fb284c624f00506bcf';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok){
                throw new Error('City not found');
            }
            const data = await response.json();
            const tempInCelsius = data.main.temp - 273.15;
            document.getElementById('cityName').textContent = `City: ${data.name}`;
            document.getElementById('temperature').textContent = `Temperature: ${tempInCelsius.toFixed(2)} °C`;
            document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`
            document.getElementById('weather').style.display = 'block';
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert('Please enter a city name ');
    }
});