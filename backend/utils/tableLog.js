let logIt = false;

export const getInfoAtStart = (req, res, next) => {
  if (!logIt) {
    req.data = req.body;
  }
  req.endpoint = req.path;
  req.requestTime = performance.now();
  next();
};

export const tableLog = async (req, res, next) => {
  if (logIt) {
    res.on("finish", () => {
      const endTime = performance.now();

      console.table({
        method: req.method,
        endpoint: req.endpoint,
        status: res.statusCode,
        responseTime: endTime - req.requestTime,
      });
      logIt = false;
    });
  }
  logIt = true;

  next();
};
