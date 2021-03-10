class App {
  constructor() {
    this.go();
  }

  go() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      this.getWeather(lat, lng);
    });
  }

  getWeather(lat, lng) {
    fetch("data.json")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);

        let apikey = json.WEATHER_API_KEY;
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apikey}`;
        console.log(url);
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            console.log(json);

            let temperature = json.main.temp;
          });
      });
  }
}

let app = new App();
