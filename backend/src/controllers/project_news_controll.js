import News from "../models/project_newsModel";

export const getNews = async (req, res) => {
    try {
        // Use aggregation to fetch random news
        const randomNews = await News.aggregate([{ $sample: { size: 4 } }]);

        if (randomNews.length > 0) {
            res.status(200).json(randomNews);
        } else {
            res.status(404).json({ message: "No news found" });
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Failed to fetch news." });
    }
};