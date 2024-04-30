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

todoSchema.static.findByID = function (id) {
  return this.findById(id);
};

todoSchema.statics.createTodo = function (todo) {
  const newTodo = new this(todo);
  return newTodo.save();
};

module.exports = mongoose.model("Todo", todoSchema);
