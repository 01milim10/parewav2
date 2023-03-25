const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, require: true },
  pub_date: { type: Date },
  source_url: { type: String, required: true },
  source_name: { type: String, required: true },
});

module.exports = News = mongoose.model("news", NewsSchema);
