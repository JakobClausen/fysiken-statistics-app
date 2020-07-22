const _ = require("lodash");

// Gets excel dates
const getDates = (json) => {
  const dates = [];
  const newArray = _.uniqBy(json, "Datum");
  newArray.forEach((day) => {
    dates.push(day.Datum);
  });
  return dates;
};

module.exports = getDates;
