const apiKeyMiddleware = (req, res, next) => {
    const clientKey = req.header("x-api-key");
    const serverKey = "grillg_secret_69420"; // match this with frontend
  
    if (clientKey !== serverKey) {
      return res.status(403).json({ message: "Forbidden: Invalid API key" });
    }
  
    next();
  };
  module.exports = apiKeyMiddleware;