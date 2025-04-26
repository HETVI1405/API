const apiKey = '344c7ca694ac03f8a80f836b5f961da5'; 

$('#getWeather').click(function () {
  const city = $('#cityInput').val().trim();
  if (city === '') {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      $('#cityName').text(data.name + ', ' + data.sys.country);
      $('#temp').text(data.main.temp);
      $('#humidity').text(data.main.humidity);
      $('#wind').text(data.wind.speed);
      $('#description').text(data.weather[0].description);
      $('#weatherResult').removeClass('hidden');
    })
    .catch(error => {
      alert(error.message + '. Please check the name and try again.');
    });
});
