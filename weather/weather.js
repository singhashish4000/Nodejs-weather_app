const request = require('request');


getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/895f214803b753686834f7277a2ad3d7/${lat},${lng}`,
        json: true,
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature 
        }) 
      } else {
        callback('Unable to fetch weather.');
      }
    });
};


module.exports.getWeather = getWeather;