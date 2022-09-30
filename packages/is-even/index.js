const isOdd = require("is-odd");

module.exports = (num) => {
  console.log("Run with num:", num);
  return !isOdd(num);
};
