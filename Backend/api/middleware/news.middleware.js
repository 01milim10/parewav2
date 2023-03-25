const checkAuth = (req, res, next) => {
  if (req.headers.authorization === "aniket-is-a-loser") {
    next();
  } else {
    res.status(401).json({ message: "Fuck off" });
  }
};

module.exports = { checkAuth };
