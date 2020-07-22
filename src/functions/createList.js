const _ = require("lodash");
const { ExcelDateToJSDate, ExcelTimeToJStime } = require("./timeConversion");

// Creates a list read to be converted into Xlsx
const removeKeys = (newJson) => {
  let newObj = [];
  Object.keys(newJson).forEach((key) => {
    newJson[key].forEach((checkin) => {
      newObj.push({ ...checkin });
    });
  });
  return newObj;
};

// Creates a list to use on client side
const createLists = (jsonData, dates) => {
  let statistics = [];
  let datesArray = [];
  dates.forEach((day) => {
    let days = [];
    let formatedDate = ExcelDateToJSDate(day);
    datesArray.push(ExcelDateToJSDate(day));

    // forEach checking on .this day
    jsonData.forEach((checkin) => {
      if (checkin.Datum === day) {
        const newTime = ExcelTimeToJStime(checkin.Tid);

        days.push({ ...checkin, Datum: formatedDate, Tid: newTime });
      }
    });

    let uniqueDay = _.uniqBy(days, "Efternamn" && "Förnamn");

    statistics.push(uniqueDay);
  });

  const jsonForXlsx = removeKeys(statistics);
  console.log(datesArray);

  return { statistics, jsonForXlsx, datesArray };
};

module.exports = createLists;
