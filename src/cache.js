let mcache = require("memory-cache");

let cache = (duration)=>{
  return (req, res, next) =>{
    let key = req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.status(200).send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body)=>{
        mcache.put(key, body, duration*1000);
        res.sendResponse(body);
      };
      next();
    }
  }
};

module.exports = { cache };
