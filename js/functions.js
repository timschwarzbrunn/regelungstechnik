
function draw () {
  let line1 = $('#line1');   
  let div1 = $('#input_variable');   
  let div2 = $('#controller');
  
  let pos1 = div1.position();
  let pos2 = div2.position();
  
  line1
    .attr('x1', pos1.left)
    .attr('y1', pos1.top)
    .attr('x2', pos2.left)
    .attr('y2', pos2.top)
    .attr('stroke', 'red');
}


// set the dimensions and margins of the graph
var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var sVg = d3.selectAll(".control_loop_plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  // translate this svg element to leave some margin.
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// X scale and Axis
var x = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel
sVg
  .append('g')
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// X scale and Axis
var y = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([height, 0]);       // This is the corresponding value I want in Pixel
sVg
  .append('g')
  .call(d3.axisLeft(y));

// Create data
var data = [ {x:10, y:20}, {x:40, y:90}, {x:80, y:50} ]

// Add 3 dots for 0, 50 and 100%
sVg
  .selectAll("whatever")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d){ return x(d.x) })
    .attr("cy", function(d){ return y(d.y) })
    .attr("r", 7)
