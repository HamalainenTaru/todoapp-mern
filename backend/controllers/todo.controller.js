/*
Path: /api/todo
Access: protected
*/
const test = (request, response) => {
  response.send(request.user);
};

module.exports = { test };
