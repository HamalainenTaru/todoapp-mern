const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    complited: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

todoSchema.set("toJSON", {
  transform: (document, todo) => {
    todo.id = todo._id.toString();
    delete todo._id;
    delete todo.__v;
  },
});

todoSchema.statics.findByID = function (id) {
  return this.findById(id);
};

todoSchema.statics.findByUser = function (userId) {
  return this.find({ user: userId });
};

todoSchema.statics.createTodo = function (todo) {
  const newTodo = new this(todo);
  return newTodo.save();
};

module.exports = mongoose.model("Todo", todoSchema);
