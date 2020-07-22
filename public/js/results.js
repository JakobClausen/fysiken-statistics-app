// Fetch the statistics
const getStatistics = async () => {
  const response = await fetch("/list");
  const data = await response.json();

  DOM(data);
  graph(data);
};

const DOM = (data, e) => {
  // display the total days of checkins
  document.querySelector(
    "#total-days"
  ).textContent = `Total days with checkin: ${data.length}`;
  // Generates the cards for each day
  spreadsheet(data);
};

// Creating an unique row
const createRow = (a, b, c, d, e) => {
  const row = document.createElement("div");
  const first = document.createElement("p");
  const second = document.createElement("p");
  const third = document.createElement("p");
  const fourth = document.createElement("p");
  const fifth = document.createElement("p");

  row.setAttribute("class", "row");
  fifth.setAttribute("class", "highlight");

  first.textContent = a;
  second.textContent = b;
  third.textContent = d;
  fourth.textContent = c;
  fifth.textContent = e;

  row.append(first, second, third, fourth, fifth);
  return row;
};

// Gets checkings for a indevidual day
const dayCheckins = (data) => {
  let cf = 0;
  let multi = 0;
  let other = 0;

  for (let i = 0; i < data.length; i++) {
    let typeOfCard = data[i].Kort;
    if (typeOfCard.includes("Crossfit")) {
      cf++;
    } else if (typeOfCard.includes("Multi")) {
      multi++;
    } else {
      other++;
    }
  }
  const total = data.length;

  return { cf, other, multi, total };
};

// Creates the whole spreadsheet
const spreadsheet = (data) => {
  const row = createRow("Date", "Crossfit", "Other", "Multi", "Total");
  document.querySelector("#spreadsheet").appendChild(row);
  let cfTotal = 0;
  let otherTotal = 0;
  let multiTotal = 0;
  let monthTotal = 0;
  for (let i = 0; i < data.length; i++) {
    const { cf, other, multi, total } = dayCheckins(data[i]);
    cfTotal += cf;
    otherTotal += other;
    multiTotal += multi;
    monthTotal += total;
    const row = createRow(data[i][1].Datum, cf, other, multi, total);

    document.querySelector("#spreadsheet").appendChild(row);
  }
  const rowTotal = createRow(
    "Monthly totals",
    cfTotal,
    otherTotal,
    multiTotal,
    monthTotal
  );
  document.querySelector("#spreadsheet").appendChild(rowTotal);
};

getStatistics();
