// General constants.
const control_loop_element_border_radius = 10;
const arrow_width = 10;
const time_max = 10;  // Seconds.
const time_step = 0.01; 

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
window.addEventListener('resize', function(event) {
  draw_control_loop_arrows();
  plot_input_function();
}, true);


// This function draws the input plot.
function plot_input_function() {
  // Get the div-element.
  let div_svg = d3.select('#input_plot');
  // Clear everything that is currently inside the div-element.
  div_svg.node().innerHTML = '';
  // Get the dimension of the div-element.
  let rect = div_svg.node().getBoundingClientRect()
  // Set the margin, width and height of the plot (needed for the axis).
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = rect.width - margin.left - margin.right,
    height = rect.height - margin.top - margin.bottom;
  // Create the svg-element and add the x- and y-axis.
  let plot_svg = div_svg
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  // x-Axis.
  let x_axis = d3.scaleLinear()
    .domain([0, time_max])      // Value-range.
    .range([0, width]);   // Pixel-range.
  plot_svg.append("g")
    .attr("transform", "translate(0," + height/2 + ")")
    .call(d3.axisBottom(x_axis));

  // y-Axis.
  var y_axis = d3.scaleLinear()
    .domain([-1.5, 1.5])
    .range([height, 0]);
  plot_svg.append("g")
    .call(d3.axisLeft(y_axis));

  // Get the input data (depending on the chosen input function).
  let input_selection = document.querySelector('#input_selection');
  let data = [];
  if (input_selection.value == "sprung") {
    data = [{x: -1, y:0}, {x: 0, y:0}, {x: 0, y:1}, {x: time_max, y:1}]
  }
  else if (input_selection.value == "impuls") {
    data = [{x: -1, y:0}, {x: 0, y:0}, {x: 0, y:1}, {x: time_step, y:1}, {x: time_step, y:0}, {x: time_max, y:0}]
  }
  else if (input_selection.value == "sinus") {
    for (let t = 0; t <= time_max; t = t + time_step) {
      data.push({x: t, y: Math.sin(t)});
    }
  }

  // Add the line.
  data = calculate_system_responses();
  plot_svg
    .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x_axis(d.t) })
        .y(function(d) { return y_axis(d.x) }));
}

plot_input_function();


// This function calculates the responses of the complete system.
function calculate_system_responses() {
  // Clear the current data.
  let data = [];
  // Fill the data with the first values.
  data.push({
    t: 0,
    w: 0,
    e: 0,
    u: 0,
    y: 0,
    x: 0,
    x_m: 0
  });
  // Get the handles to the different range sliders und selections.
  let input_selection = document.querySelector('#input_selection');
  let controller_selection = document.querySelector('#controller_selection');
  let system_selection = document.querySelector('#system_selection');
  // Controller.
  let controller_k, controller_ti, controller_td, controller_tn, controller_tv;
  if (controller_selection.value == 'P') {
    controller_k = document.querySelector('#controller_range_k').value;
  }
  else if (controller_selection.value == 'I') {
    controller_ti = document.querySelector('#controller_range_ti').value;
  }
  else if (controller_selection.value == 'D') {
    controller_td = document.querySelector('#controller_range_td').value;
  }
  else if (controller_selection.value == 'PI') {
    controller_k = document.querySelector('#controller_range_k').value;
    controller_ti = document.querySelector('#controller_range_ti').value;
  }
  else if (controller_selection.value == 'PD') {
    controller_k = document.querySelector('#controller_range_k').value;
    controller_td = document.querySelector('#controller_range_td').value;
  }
  else if (controller_selection.value == 'PID') {
    controller_k = document.querySelector('#controller_range_k').value;
    controller_tn = document.querySelector('#controller_range_tn').value;
    controller_tv = document.querySelector('#controller_range_tv').value;
  }
  // System.
  if (system_selection.value == 'P') {
    let system_k = document.querySelector('#system_range_k').value;
  }
  else if (system_selection.value == 'PT1') {
    let system_k = document.querySelector('#system_range_k').value;
    let system_t = document.querySelector('#system_range_t').value;
  }
  else if (system_selection.value == 'PT2') {
    let system_k = document.querySelector('#system_range_k').value;
    let system_d = document.querySelector('#system_range_d').value;
    let system_omega = document.querySelector('#system_range_omega').value;
  }
  // Iterate and calculate the whole data depending on the chosen parameters.
  for (let t = time_step; t <= time_max; t += time_step) {
    data_current = {};
    data_last = data[data.length - 1];
    // The time.
    data_current.t = t;
    // Calculate the input.
    if (input_selection.value == "sprung") {
      data_current.w = 1;
    }
    else if (input_selection.value == "impuls") {
      if (t == time_step) {
        data_current.w = 1 / time_step;
      }
      else {
        data_current.w = 0;
      }
    }
    else if (input_selection.value == "sinus") {
      data_current.w = Math.sin(t);
    }
    // Calculate the error.
    data_current.e = data_current.w - data_last.x_m;
    // Calculate the controller respone depending on the chosen controller.
    if (controller_selection.value == 'P') {
      data_current.u = data_current.e * controller_k;
    }
    else if (controller_selection.value == 'I') {
      data_current.u = data_last.u + data_current.e * (time_step / controller_ti);
    }
    else if (controller_selection.value == 'D') {
      data_current.u = (data_current.e - data_last.e) * (controller_td / time_step);
    }
    else if (controller_selection.value == 'PI') {
      data_current.u = data_current.e * controller_k;
    }
    // Maybe we should discuss the next step.
    data_current.y = data_current.u;
    // Calculate the system response.
    data_current.x = data_last.x + (2*data_current.y - data_last.x) * 
      (time_step / (2 + time_step));
    // Measure the current output value.
    data_current.x_m = data_current.x * 2;
    // Append the current data to the whole data.
    data.push(data_current);
  }
  return data;
}

// Input visualization. Change the image inside the input_control_loop_element depending on the input-function.
const input_selection = document.querySelector('#input_selection');
input_selection.addEventListener('change', (event) => {
  // Change the image.
  let input_visualization_image = document.querySelector('#input_visualization');
  input_visualization_image.src = 'img/' + input_selection.value + '.png';
  // Redraw the input plot.
  plot_input_function();
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
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'controller_range_k', 'K');
  }
  else if (controller_selection.value == 'I') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'controller_range_ti', 'T<sub>I</sub>');
  }
  else if (controller_selection.value == 'D') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'controller_range_td', 'T<sub>D</sub>');
  }
  else if (controller_selection.value == 'PI') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'controller_range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'controller_range_ti', 'T<sub>I</sub>');
  }
  else if (controller_selection.value == 'PD') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'controller_range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'controller_range_td', 'T<sub>D</sub>');
  }
  else if (controller_selection.value == 'PID') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'controller_range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'controller_range_tn', 'T<sub>N</sub>') + 
      get_range_slider_html(0, 100, 10, 'controller_range_tv', 'T<sub>V</sub>');
  }
  // Plot.
  plot_input_function();
});
const system_selection = document.querySelector('#system_selection');
system_selection.addEventListener('change', (event) => {
  // Get the range slider div.
  let range_slider_box = document.querySelector('#system_range_slider_box');
  // Remove the existing range sliders.
  range_slider_box.innerHTML = '';
  // Add the range sliders depending on the chosen system-type.
  if (system_selection.value == 'P') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'system_range_k', 'K');
  }
  else if (system_selection.value == 'PT1') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'system_range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'system_range_t', 'T');
  }
  else if (system_selection.value == 'PT2') {
    range_slider_box.innerHTML = get_range_slider_html(0, 100, 10, 'system_range_k', 'K') + 
      get_range_slider_html(0, 100, 10, 'system_range_d', 'D') + 
      get_range_slider_html(0, 100, 10, 'system_range_omega', '&omega;<sub>0</sub>');
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