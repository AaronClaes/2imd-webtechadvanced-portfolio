class App {
  constructor() {
    this.go();
  }

  go() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      if (this.checkLocalStorage() === false) {
        this.getWeather(lat, lng);
      } else {
        this.setData();
      }
    });
  }

  checkLocalStorage() {
    let lastclear = localStorage.getItem("lastclear");
    let now = new Date().getTime();
    console.log(now - lastclear);
    if (now - lastclear < 1000 * 60 * 60) {
      if (
        localStorage.getItem("temp") === null &&
        localStorage.getItem("weatherId") === null
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      localStorage.clear();
      return false;
    }
  }

  // getKeys(key) {
  //   let result;
  //   return fetch("data.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       switch (key) {
  //         case "ytapikey":
  //           result = json.YT_API_KEY;
  //           console.log(result);
  //           break;
  //         case "weatherapikey":
  //           result = json.WEATHER_API_KEY;
  //           break;
  //       }
  //       return result;
  //     });
  // }

  getWeather(lat, lng) {
    fetch("data.json")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let ytapikey = json.YT_API_KEY;
        let weatherapikey = json.WEATHER_API_KEY;
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${weatherapikey}`;

        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            let temp = json.main.temp;
            localStorage.setItem("temp", temp);
            let weatherId = json.weather[0].id;
            console.log(weatherId);
            localStorage.setItem("weatherId", weatherId);
            localStorage.setItem("lastclear", new Date().getTime());
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
    background = localStorage.setItem("background", background);
    title = localStorage.setItem("title", title);
    subtitle = localStorage.setItem("subtitle", subtitle);
    return query;
  }

  getSongs(query, ytapikey) {
    let url = `https://youtube.googleapis.com/youtube/v3/search?&order=viewCount&part=snippet&q=${query}&key=${ytapikey}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let videoTitle = json.items[0].snippet.title;
        localStorage.setItem("videoTitle", videoTitle);
        let videoId = json.items[0].id.videoId;
        localStorage.setItem("videoId", videoId);
        let channelName = json.items[0].snippet.channelTitle;
        localStorage.setItem("channelName", channelName);
        let channelId = json.items[0].snippet.channelId;

        url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${ytapikey}`;
        console.log(url);
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            let channelIcon = json.items[0].snippet.thumbnails.high.url; //channelImg
            localStorage.setItem("channelIcon", channelIcon);
            return true;
          })
          .then((response) => {
            if (response === true) {
              this.setData();
            }
          });
      });
  }

  setData() {
    let videoTitle = localStorage.getItem("videoTitle");
    let videoId = localStorage.getItem("videoId");
    let channelName = localStorage.getItem("channelName");
    let channelIcon = localStorage.getItem("channelIcon");
    console.log(channelIcon);

    let background = localStorage.getItem("background");
    let title = localStorage.getItem("title");
    let subtitle = localStorage.getItem("subtitle");

    document.querySelector(".top").style.backgroundImage = `url(${background})`;
    document.querySelector(".main__weather").innerHTML = title;
    document.querySelector(".main__bottom__subtitle").innerHTML = subtitle;

    document.querySelector(".footer__details__artist").innerHTML = channelName;

    document.querySelector(".footer__details__song").innerHTML = videoTitle;

    document.querySelector(
      ".footer__play-button-background"
    ).style.backgroundImage = `url(${channelIcon})`;

    document
      .querySelector(".footer__play-button__link")
      .setAttribute("href", `https://music.youtube.com/watch?v=${videoId}`);
  }
}

let app = new App();
