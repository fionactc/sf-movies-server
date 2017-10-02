let axios = require("axios");

let socrata = axios.create({
  baseURL: "https://data.sfgov.org/resource",
  timeout: 5000,
  headers: { "X-App-Token": process.env.MOVIES_APP_TOKEN }
});

// get titles that contain term as substring
let getTitles = (term)=>{
  return socrata.get("/wwmu-gmzc.json?$where=lower(title) like lower(\'%25" + term + "%25\') and locations is not null&$select=title&$group=title")
    .then(result=>{
      return result
    })
    .catch(err=>{
      throw err;
    })
};

// get movie details that match title
let getMovie = (title)=>{
  return socrata.get(`/wwmu-gmzc.json?title=${title}&$select=title,release_year,locations,director,fun_facts`)
    .then(result=>{
      return result
    })
    .catch(err=>{
      throw err;
    })
};

module.exports = { getTitles, getMovie };

