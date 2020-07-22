// Fetches the dates that has checkins
const gestDates = async () => {
  const response = await fetch("/dates");
  const dates = await response.json();
  return dates;
};

const graphData = (data) => {
  const cfData = [];
  const multiData = [];
  const otherData = [];
  const totalData = [];

  for (let i = 0; i < data.length; i++) {
    const { cf, other, multi, total } = dayCheckins(data[i]);
    cfData.push(cf);
    multiData.push(multi);
    otherData.push(other);
    totalData.push(total);
  }

  return { cfData, multiData, otherData, totalData };
};

const makeDataset = (dates, data, type) => {
  const dataset = [];

  for (let i = 0; i < data.length; i++) {
    const { cfData, multiData, otherData, totalData } = graphData(data);
    switch (type) {
      case "crossfit":
        dataset.push({ date: dates[i], data: cfData[i] });
        break;
      case "multi":
        dataset.push({ date: dates[i], data: multiData[i] });
        break;
      case "other":
        dataset.push({ date: dates[i], data: otherData[i] });
        break;
      case "total":
        dataset.push({ date: dates[i], data: totalData[i] });
        break;
    }
  }

  return dataset;
};

const createGraph = async (data, type) => {
  const graphDiv = document.createElement("div");
  graphDiv.setAttribute("class", "graph-container");
  const graphTitle = document.createElement("p");
  graphTitle.textContent = type.toUpperCase();
  graphDiv.append(graphTitle);

  // D3 graph
  const dates = await gestDates();
  const dataset = makeDataset(dates, data, type);

  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 650 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

  // append the svg
  const svg = d3
    .select(graphDiv)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      dates.map(function (d) {
        return d;
      })
    )
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .style("color", "#222222")
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "15px")
    .style("color", "#222222");

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 120]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y)).style("color", "#222222");

  // Bars
  svg
    .selectAll("mybar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.date);
    })
    .attr("y", function (d) {
      return y(d.data);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.data);
    })
    .attr("fill", "#79c70b");

  document.querySelector("#graph-area").appendChild(graphDiv);
};

const graph = (data) => {
  createGraph(data, "crossfit");
  createGraph(data, "multi");
  createGraph(data, "other");
  createGraph(data, "total");
};
