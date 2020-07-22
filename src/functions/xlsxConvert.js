const getDates = require("./dates");
const createLists = require("./createList");
const { readXLSX } = require("./xlsxFunctions");

// xlsx convertion init function
const xlsxJson = (doc) => {
  const jsonData = readXLSX(doc);

  const dates = getDates(jsonData);
  const { statistics, jsonForXlsx, datesArray } = createLists(jsonData, dates);
  return { jsonData, statistics, jsonForXlsx, datesArray };
};

module.exports = xlsxJson;
