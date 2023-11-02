const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    P5: {
      balance: {
        type: Number,
        default: 100,
      },
      history: [
        {
          amount: { type: Number },
          givenTo: { type: Types.ObjectId, ref: "Users" },
          dateStamp: { type: String },
        },
      ],
    },
    Reward: {
      balance: {
        type: Number,
        default: 0,
      },
      history: [
        {
          amount: { type: Number },
          givenBy: { type: Types.ObjectId, ref: "Users" },
          dateStamp: { type: String },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = model("Users", userSchema);
