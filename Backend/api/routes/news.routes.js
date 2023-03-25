const { Router } = require("express");
const newsController = require("../controllers/news.controller");
const router = Router();

router.get("/news", newsController.getNews);
router.post("/news", newsController.addNews);
router.delete("/news/:id", newsController.deleteNews);
router.get("/rss", newsController.getRssFeed);

module.exports = router;
