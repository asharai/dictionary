import axios from "../axios.js";

export const getWord = async (req, res) => {
  try {
    const response = await axios(`/${req.body.word}`);

    return res.json({
      ...response.data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось найти слово",
    });
  }
};
