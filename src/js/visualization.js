/**
 * Creates a bar chart of algorithm path lengths using D3.js
 * @param {Document} document 
 * @param {String[]} algorithms 
 */
export const generateBarChart = (container, algorithms) => {
  // determine the largest pathLength; useful for setting the y-axis
  const maxPathLength = Math.max(...algorithms.map(obj => obj.pathLength));

  const newChart = document.createElement("div");
  newChart.id = "assess-chart";
  container.appendChild(newChart);

  const width = 600;
  const height = 400;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };

  const svg = d3.select("#assess-chart")
    .append("svg")
    .attr("height", height - margin.top - margin.bottom)
    .attr("width", width - margin.left - margin.right)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(algorithms.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  
  const y = d3.scaleLinear()
    .domain([0, maxPathLength])
    .range([height - margin.bottom, margin.top]);
  
  svg
    .append("g")
    .attr("fill", "royalblue")
    .selectAll("rect")
    .data(algorithms.sort((a, b) => d3.descending(a.pathLength, b.pathLength)))
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.pathLength))
      .attr("height", d => y(0) - y(d.pathLength))
      .attr("width", x.bandwidth())
      .attr("class", "chart-bar");

  const xAxis = g => {
    g
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => algorithms[i].name))
      .attr("font-size", "14px");
  };

  const yAxis = g => {
    g
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, algorithms.format))
    .attr("font-size", "14px");
  };

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
};