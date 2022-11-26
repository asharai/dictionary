import DictionaryWordModel from "../models/DictionaryWord.js";

export const addWord = async (req, res) => {
  try {
    const doc = new DictionaryWordModel({
      word: req.body.word,
      meaning: req.body.meaning,
      user: req.userId,
    });
    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось добавить слово",
    });
  }
};
