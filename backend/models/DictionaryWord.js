import mongoose from "mongoose";

const DictionaryWordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    word: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DictionaryWord", DictionaryWordSchema);
