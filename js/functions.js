// General constants.
const control_loop_element_border_radius = 10;
const arrow_width = 10;

// This function draws a connecting line with an arrow between two elements.
function draw_arrow (from, to, line_id) {
  let line = $(line_id);   
  let div1 = $(from);   
  let div2 = $(to);
  
  let pos1 = div1.position();
  let pos2 = div2.position();
  
  line
    .attr('x1', pos1.left + div1.width())
    .attr('y1', pos1.top + div1.height() / 2 + control_loop_element_border_radius / 2)
    .attr('x2', pos2.left - control_loop_element_border_radius - arrow_width)
    .attr('y2', pos2.top + div2.height() / 2 + control_loop_element_border_radius / 2)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('marker-end', "url(#arrowhead)");
}

function draw_control_loop_arrows() {
  draw_arrow('#input_variable', '#controller', '#line_input_to_controller');
  draw_arrow('#controller', '#controlled_system', '#line_controller_to_system');
  draw_arrow('#controlled_system', '#output_variable', '#line_system_to_output');
  let div_input = $('#input_variable');
  let div_controller = $('#controller');
  let div_controlled_system = $('#controlled_system');
  let div_output = $('#output_variable');
  let div_measuring_element = $('#measuring_element');
  let path_to_measurement = $('#line_to_measurement');
  let path_from_measurement = $('#line_from_measurement');
  // To measurement.
  let start_position_x = div_controlled_system.position().left + div_controlled_system.width();
  start_position_x = start_position_x + (div_output.position().left - start_position_x) / 2;
  let start_position_y = div_controlled_system.position().top + div_controlled_system.height() / 2 + control_loop_element_border_radius / 2;
  let end_position_x = div_measuring_element.position().left + div_measuring_element.width() + control_loop_element_border_radius + arrow_width;
  let end_position_y = div_measuring_element.position().top + div_measuring_element.height() / 2 + control_loop_element_border_radius / 2;
  path_to_measurement
    .attr('d', "M" + start_position_x + " " + start_position_y + " V" + (end_position_y - control_loop_element_border_radius)  + 
      "a" + control_loop_element_border_radius + "," + control_loop_element_border_radius + " 1 0 1 -10,10 H" + end_position_x)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('marker-end', "url(#arrowhead)");
  // From measurement.
  start_position_x = div_measuring_element.position().left;
  start_position_y = div_measuring_element.position().top + div_measuring_element.height() / 2 + control_loop_element_border_radius / 2;
  end_position_x = div_input.position().left + div_input.width();
  end_position_x = end_position_x + (div_controller.position().left - end_position_x) / 2;
  end_position_y = div_input.position().top + div_input.height() / 2 + 1.5 * control_loop_element_border_radius + arrow_width;
  path_from_measurement
    .attr('d', "M" + start_position_x + " " + start_position_y + " H" + (end_position_x + control_loop_element_border_radius)  + 
      "a" + control_loop_element_border_radius + "," + control_loop_element_border_radius + " 0 0 1 -10,-10 V" + end_position_y)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('marker-end', "url(#arrowhead)");
}

draw_control_loop_arrows();
window.onresize = draw_control_loop_arrows;




// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 400 - margin.left - margin.right,
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
    .domain([0, 10])         // This is the min and the max of the data: 0 to 100 if percentages
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


// Input visualization. Change the image inside the input_control_loop_element depending on the input-function.
const input_selection = document.querySelector('#input_selection');
input_selection.addEventListener('change', (event) => {
  // Change the image.
  let input_visualization_image = document.querySelector('#input_visualization');
  input_visualization_image.src = 'img/' + input_selection.value + '.png';
});

// Controller range slider, system range slider and measuring element range slider. 
// Change the shown range sliders depending on the chosen controller-type / system-type.
function get_range_slider_html (min_value, max_value, current_value, id, label) {
  return '<div class="range_slider"><input type="range" ' + 
    'min="' + min_value + '" max="' + max_value + '" value="' + current_value + 
    '"  id="' + id + '"><label for="' + id + '">' + label + '</label></div>';
}
const controller_selection = document.querySelector('#controller_selection');
controller_selection.addEventListener('change', (event) => {
  // Get the range slider div.
  let range_slider_box = document.querySelector('#controller_range_slider_box');
  // Remove the existing range sliders.
  range_slider_box.innerHTML = '';
  // Add the range sliders depending on the chosen controller-type.
  if (controller_selection.value == 'P') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K');
  }
  else if (controller_selection.value == 'I') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_ti', 'T<sub>I</sub>');
  }
  else if (controller_selection.value == 'D') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_td', 'T<sub>D</sub>');
  }
  else if (controller_selection.value == 'PI') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'range_ti', 'T<sub>I</sub>');
  }
  else if (controller_selection.value == 'PD') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'range_td', 'T<sub>D</sub>');
  }
  else if (controller_selection.value == 'PID') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'range_tn', 'T<sub>N</sub>') + 
      get_range_slider_html(0, 100, 10, 'range_tv', 'T<sub>V</sub>');
  }
});
const system_selection = document.querySelector('#system_selection');
system_selection.addEventListener('change', (event) => {
  // Get the range slider div.
  let range_slider_box = document.querySelector('#system_range_slider_box');
  // Remove the existing range sliders.
  range_slider_box.innerHTML = '';
  // Add the range sliders depending on the chosen system-type.
  if (system_selection.value == 'P') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K');
  }
  else if (system_selection.value == 'PT1') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'range_t', 'T');
  }
  else if (system_selection.value == 'PT2') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'range_d', 'D') + 
      get_range_slider_html(0, 100, 10, 'range_w', '&omega;<sub>0</sub>');
  }
});
const measurement_selection = document.querySelector('#measurement_selection');
measurement_selection.addEventListener('change', (event) => {
  // Get the range slider div.
  let range_slider_box = document.querySelector('#measurement_range_slider_box');
  // Remove the existing range sliders.
  range_slider_box.innerHTML = '';
  // Add the range sliders depending on the chosen system-type.
  if (measurement_selection.value == 'P') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K');
  }
  else if (measurement_selection.value == 'PT1') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'range_t', 'T');
  }
});