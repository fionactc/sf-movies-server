let axios = require("axios");

let geoCoder = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode",
  timeout: 5000
});

let getCoordinates = (address)=>{
  address = encodeURIComponent(address);
  return geoCoder.get(`/json?address=${address}&components=locality:san francisco&key=${process.env.GOOGLE_MAP_KEY}`)
    .then(result=>{
      if (result.data.results.length) {
        // return coordinates object
        return result.data.results[0].geometry.location;
      }
      return null;
    })
    .catch(err=>{
      if (err) console.log(err);
      return err;
    })
};

module.exports = {
  getCoordinates
};
