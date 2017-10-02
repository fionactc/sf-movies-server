let express = require("express");
let router = new express.Router();

let socrata = require("./socrata");
let geoCoder = require("./geoCoder");

router.get("/titles", function(req, res) {
  let searchTerm = req.query.searchTerm;
  if (searchTerm) {
    socrata.getTitles(searchTerm).then((result)=>{
      res.status(200).send(result.data);
    })
    .catch((err)=>{
      console.error("Error", err.response.data);
      res.status(500).send("500: Server encountered error");
    });
  } else {
    res.status(404).send("404: Missing search term");
  }
});

router.get("/movie", function(req, res) {
  let title = req.query.title;
  if (title) {
    socrata.getMovie(title).then((result)=>{
      let locations = result.data;
      let promises = [];

      if (locations.length) {
        locations.forEach((item)=>{
          promises.push(geoCoder.getCoordinates(item.locations)
            .then((coordinates)=>{
              item.coordinates = coordinates;
          }));
        });

        // execute find coordinates for all locations
        Promise.all(promises).then(()=>{
          res.status(200).send(locations);
        }).catch((err)=>{
          console.error("Error", err.response.data);
          res.status(500).send("500: Server encountered error");
        });
      }
    });
  } else
    res.status(404).send("404: Missing title");
});

module.exports = router;
