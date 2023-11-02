//responses
const responses = require("../utils/responses");

exports.testRequest = (req, res) => {
  return responses.successResponse(res, "Route Called.");
};
