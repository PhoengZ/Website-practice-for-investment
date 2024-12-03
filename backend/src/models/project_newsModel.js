import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  Type: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fullContent: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("News", newsSchema);
export default News;
