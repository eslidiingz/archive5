const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    address: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    collectionAssets: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator);

schema.method.toJSON = function () {
  return {
    address: this.address,
    title: this.title,
    description: this.description,
    collectionAssets: this.collectionAssets,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// Custom field before save
schema.pre("save", function (next) {
  next();
});

module.exports = mongoose.model("Users", schema);
