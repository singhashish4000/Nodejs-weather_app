const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
             .options({
                 a:{
                     demand: true,
                     alias: 'address',
                     describe: 'Address to fetch for',
                     string: true
                 }
             })
             .help()
             .alias('help','h')
             .argv;

const encodedAddress = encodeURIComponent(argv.address);
geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geoCodeUrl)
.then((res) => {
    if (res.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    var lat = res.data.results[0].geometry.location.lat;
    var lng = res.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/895f214803b753686834f7277a2ad3d7/${lat},${lng}`
    console.log(res.data.results[0].formatted_address);
    axios.get(weatherUrl)
    .then((res) => {
        var temp = res.data.currently.temperature;
        var actual_temp = res.data.currently.apparentTemperature;
        console.log(`Temperature: ${temp}`)
        console.log(`Actual Temperature: ${actual_temp}`);
    })
    .catch((e) => {
        console.log(e);
    })
})
.catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API Servers.');
    } else {
        console.log(e.message);
    }
})
