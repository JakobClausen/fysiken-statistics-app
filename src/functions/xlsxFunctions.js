const json2xls = require("json2xls");
const fs = require("fs");
const XLSX = require("xlsx");

// Read doc from form
const readXLSX = (doc) => {
  const data = XLSX.readFile(doc);
  const sheet_name_list = data.SheetNames;
  return XLSX.utils.sheet_to_json(data.Sheets[sheet_name_list[0]]);
};

// Creates a new xlsx file for download
const createXlsx = (jsonForXlsx) => {
  const xls = json2xls(jsonForXlsx);
  fs.writeFileSync("./newXlsx/data.xlsx", xls, "binary");
};

module.exports = { createXlsx, readXLSX };
