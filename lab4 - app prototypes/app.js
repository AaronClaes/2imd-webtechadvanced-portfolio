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
        let weatherapikey = json.WEATHER_API_KEY;
        let ytapikey = json.YT_API_KEY;
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${weatherapikey}`;

        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            let temp = json.main.temp;
            let weatherId = json.weather[0].id;
            let status = this.checkCondition(weatherId, temp);
            let query = this.getData(status);
            this.getSongs(query, ytapikey);
          });
      });
  }

  checkCondition(weatherId, temp) {
    let status;
    let query;
    if (weatherId >= 200 && weatherId < 540) {
      query = "happy music";
      return (status = "rain");
    } else if (weatherId >= 600 && weatherId < 640) {
      query = "cosy music";
      return (status = "snow");
    } else if (weatherId === 800 && weatherId === 801 && temp > 15) {
      query = "pop music";
      return (status = "sunny");
    } else if (weatherId > 801) {
      query = "happy music";
      return (status = "cloudy");
    } else {
      query = "pop music";
      return (status = "other");
    }
  }

  getData(status) {
    let query;
    let background;
    let title;
    let subtitle;

    switch (status) {
      case "rain":
        query = "happy music";
        background = "../images/raining.jpg";
        title = "Rainy today?";
        subtitle = "Enjoy it with";
        break;
      case "snow":
        query = "cosy music";
        background = "../images/winter.jpg";
        title = "Snowing today?";
        subtitle = "Get cosy with";
        break;
      case "sunny":
        query = "pop music";
        background = "../images/sunny.jpg";
        title = "Summer vibes today?";
        subtitle = "Get the party started with";
        break;
      case "cloudy":
        query = "happy music";
        background = "../images/cloudy.jpg";
        title = "Missing the summer weather?";
        subtitle = "Get summer vibes with";
        break;
      case "other":
        query = "pop music";
        background = "../images/cloudy.jpg";
        title = "Missing the summer weather?";
        subtitle = "Get summer vibes with";
        break;
      default:
        query = "pop music";
        background = "../images/cloudy.jpg";
        title = "Missing the summer weather?";
        subtitle = "Get summer vibes with";
        break;
    }

    document.querySelector(".top").style.backgroundImage = `url(${background})`;
    document.querySelector(".main__weather").innerHTML = title;
    document.querySelector(".main__bottom__subtitle").innerHTML = subtitle;
    return query;
  }

  getSongs(query, ytapikey) {
    let url = `https://youtube.googleapis.com/youtube/v3/search?&order=viewCount&part=snippet&q=${query}&key=${ytapikey}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let videoTitle = json.items[0].snippet.title; //videoTitle
        let videoId = json.items[0].id.videoId; //videoID
        let channelName = json.items[0].snippet.channelTitle;
        let channelId = json.items[0].snippet.channelId;

        document.querySelector(
          ".footer__details__artist"
        ).innerHTML = channelName;

        document.querySelector(".footer__details__song").innerHTML = videoTitle;

        let url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${ytapikey}`;
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            let channelIcon = json.items[0].snippet.thumbnails.high.url; //channelImg
            document.querySelector(
              ".footer__play-button-background"
            ).style.backgroundImage = `url(${channelIcon})`;

            document
              .querySelector(".footer__play-button__link")
              .setAttribute(
                "href",
                `https://music.youtube.com/watch?v=${videoId}`
              );
          });
      });
  }
}

let app = new App();
