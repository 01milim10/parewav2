const { Router } = require("express");
const newsMiddleware = require("../middleware/news.middleware");

const router = Router();

router.get("/", newsMiddleware.checkAuth, (req, res, next) => {
  return res.status(200).json({ message: "Success" });
});
router.get("/test", (req, res, next) => {
  return res.status(200).json({ message: "Inside test" });
});

module.exports = router;
