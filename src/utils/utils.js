export const getAverageWeather = (weathers) => {
  var modeMap = {};
    var maxEl = weathers[0], maxCount = 1;
    for(var i = 0; i < weathers.length; i++)
    {
        var el = weathers[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

export const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const getWeather = (response) => {
  console.log(response.data);
  let dateArray = [];
  let weatherArray = [];
  
  for (let i = 0; i < response.data.list.length; i++) {
    let dt = response.data.list[i].dt;
    let dateString = new Date(0);
    dateString.setUTCSeconds(dt);
    let date = formatDate(dateString);
    let temp = response.data.list[i].main.temp;
    let weather = response.data.list[i].weather[0].main;
    if (!dateArray.includes(date)) {
      dateArray.push(date);
      weatherArray.push({
        weather: [weather],
        date: date,
        dt: dt,
        temps: [temp],
        min: temp,
        sum: temp,
        avg: temp,
      });
    } else {
      for (let j = 0; j < weatherArray.length; j++) {
        if (weatherArray[j].date === date) {
          weatherArray[j].temps.push(temp);
          weatherArray[j].weather.push(weather);
          if (temp < weatherArray[j].min) {
            weatherArray[j].min = temp;
          }
          weatherArray[j].sum =
            Number(weatherArray[j].sum) + Number(temp);
          weatherArray[j].avg =
            Number(weatherArray[j].sum) / weatherArray[j].temps.length;
        }
      }
    }
  }
  let newWeathers = [];
  for (let i = 0; i < weatherArray.length; i++) {
    newWeathers.push({
      date: weatherArray[i].dt,
      tempMax: weatherArray[i].avg,
      tempMin: weatherArray[i].min,
      weather: getAverageWeather(weatherArray[i].weather),
    });
  }

  return newWeathers;
}