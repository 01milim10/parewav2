const { default: mongoose } = require("mongoose");
const News = require("../models/news.model");
const axios = require("axios");
const xmlToJson = require("xml-js");

const getNews = async (req, res) => {
  try {
    const news = await News.find();
    if (news.length === 0) {
      res.status(200).json({ message: "Na-da" });
    } else {
      res.status(200).json({ message: "Success", news });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error, try again later" });
  }
};
const addNews = async (req, res) => {
  try {
    const { title, description, source_url, source_name, pub_date } = req.body;
    const result = await new News({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      source_name,
      source_url,
      pub_date,
    }).save();
    if (result.length === 0) {
      res.status(400).json({ message: "Error, try again later" });
    } else {
      res.status(200).json({ message: "Success", result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error, try again later" });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await News.findById(id);

    if (!result) {
      res.status(400).json({ message: "Error, news not found" });
    } else {
      await News.deleteOne({ _id: id });
      res.status(200).json({ message: "Success, news deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error, try again later" });
  }
};

const bulkAddNews = async (rss) => {
  try {
    dataToSave = rss.channel.item.map((item) => {
      return {
        insertOne: {
          document: {
            _id: new mongoose.Types.ObjectId(),
            title: item.title._text,
            description: item.description._text,
            source_url: item.link._text,
            source_name: rss.channel.title._text,
            pub_date: new Date(),
          },
        },
      };
    });
    await News.bulkWrite(dataToSave);
  } catch (error) {
    console.log(error);
  }
};

const getRssFeed = (req, res) => {
  const url = process.env.KATHMANDUPOST_RSS;
  let rssFeed;
  try {
    axios.get(url).then((response) => {
      rssFeed = response.data;
      convertedFeed = xmlToJson.xml2json(rssFeed, {
        compact: true,
        spaces: 2,
      });
      processedFeed = JSON.parse(convertedFeed);
      bulkAddNews(processedFeed.rss);
      res.status(200).json({ message: "Successfully fetched" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error, try again later" });
  }
};

module.exports = { getNews, addNews, deleteNews, getRssFeed };
