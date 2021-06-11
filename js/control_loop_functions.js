// General constants.
const time_max = 20;  // Seconds.
const time_step = 0.001; 

// What shall happen on resize?
window.addEventListener('resize', function(event) {
  // Redraw the arrows.
  draw_control_loop_arrows();
  // Redraw the plots.
  control_loop_handler.calc_and_plot();
  // Since the window size is updated with a little delay if the window
  // was maximized, update everything again with a little delay.
  setTimeout(function(){
    // Redraw the arrows.
    draw_control_loop_arrows();
    // Redraw the plots.
    control_loop_handler.calc_and_plot();
  }, 1000);
}, true);


// This function draws the arrows that connect the control loop elements. 
function draw_control_loop_arrows() {
  // General constants.
  let stroke_width = 2;
  let arrow_width = document.querySelector('#arrowhead').markerWidth.animVal.value * stroke_width;
  let junction_radius = 2 * stroke_width;
  let sum_junction_radius = 3 * stroke_width;
  let path_radius = 10;
  let font_size = 14;

  // Get the required control loop elements.
  let div_input = $('#input_variable');
  let div_controller = $('#controller');
  let div_system = $('#controlled_system');
  let div_output = $('#output_variable');
  let div_measuring_element = $('#measuring_element');

  // Get the svg-elements.
  let line_input_to_sum_junction = $('#line_input_to_sum_junction');
  let line_sum_junction_to_controller = $('#line_sum_junction_to_controller');
  let line_controller_to_system = $('#line_controller_to_system');
  let line_system_to_output = $('#line_system_to_output');
  let path_to_measurement = $('#path_to_measurement');
  let path_from_measurement = $('#path_from_measurement');
  let junction_to_measurement = $('#junction_to_measurement');
  let sum_junction = $('#sum_junction');
  let text_sum_junction_plus = $('#text_sum_junction_plus');
  let text_sum_junction_minus = $('#text_sum_junction_minus');
  let text_control_difference = $('#text_control_difference');
  let text_manipulated_variable = $('#text_manipulated_variable');

  // Draw line from the input to the sum-junction.
  line_input_to_sum_junction
    .attr('x1', div_input.position().left + div_input.outerWidth())
    .attr('y1', div_input.position().top + div_input.outerHeight() / 2)
    .attr('x2', div_input.position().left + div_input.outerWidth() + 
      (div_controller.position().left - (div_input.position().left + div_input.outerWidth())) / 2 -
      (arrow_width + sum_junction_radius))
    .attr('y2', div_controller.position().top + div_controller.outerHeight() / 2)
    .attr('stroke', 'black')
    .attr('stroke-width', stroke_width)
    .attr('marker-end', "url(#arrowhead)");
  
  // Draw the line from the sum-junction to the controller.
  line_sum_junction_to_controller
    .attr('x1', div_input.position().left + div_input.outerWidth() + 
      (div_controller.position().left - (div_input.position().left + div_input.outerWidth())) / 2 +
      (sum_junction_radius))
    .attr('y1', div_input.position().top + div_input.outerHeight() / 2)
    .attr('x2', div_controller.position().left - arrow_width)
    .attr('y2', div_controller.position().top + div_controller.outerHeight() / 2)
    .attr('stroke', 'black')
    .attr('stroke-width', stroke_width)
    .attr('marker-end', "url(#arrowhead)");

  // Draw the line from the controller to the controlled system.
  line_controller_to_system
    .attr('x1', div_controller.position().left + div_controller.outerWidth())
    .attr('y1', div_controller.position().top + div_controller.outerHeight() / 2)
    .attr('x2', div_system.position().left - arrow_width)
    .attr('y2', div_system.position().top + div_system.outerHeight() / 2)
    .attr('stroke', 'black')
    .attr('stroke-width', stroke_width)
    .attr('marker-end', "url(#arrowhead)");

  // Draw the line from the controlled system to the output.
  line_system_to_output
    .attr('x1', div_system.position().left + div_system.outerWidth())
    .attr('y1', div_system.position().top + div_system.outerHeight() / 2)
    .attr('x2', div_output.position().left - arrow_width)
    .attr('y2', div_output.position().top + div_output.outerHeight() / 2)
    .attr('stroke', 'black')
    .attr('stroke-width', stroke_width)
    .attr('marker-end', "url(#arrowhead)");

  // Draw the path from the output to the measuring element.
  let start_position_x, start_position_y, end_position_x, end_position_y;
  start_position_x = div_system.position().left + div_system.outerWidth() + 
    (div_output.position().left - (div_system.position().left + div_system.outerWidth())) / 2;
  start_position_y = div_system.position().top + div_system.outerHeight() / 2;
  end_position_x = div_measuring_element.position().left + div_measuring_element.outerWidth() + arrow_width;
  end_position_y = div_measuring_element.position().top + div_measuring_element.outerHeight() / 2;
  path_to_measurement
    .attr('d', "M" + start_position_x + " " + start_position_y + " V" + (end_position_y - path_radius)  + 
      "a" + path_radius + "," + path_radius + " 1 0 1 -" + path_radius + "," + path_radius + " H" + end_position_x)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', stroke_width)
    .attr('marker-end', "url(#arrowhead)");

  // Draw the path from the measuring element to the sum-junction.
  start_position_x = div_measuring_element.position().left;
  start_position_y = div_measuring_element.position().top + div_measuring_element.outerHeight() / 2;
  end_position_x = div_input.position().left + div_input.outerWidth() + 
    (div_controller.position().left - (div_input.position().left + div_input.outerWidth())) / 2;
  end_position_y = div_input.position().top + div_input.outerHeight() / 2 + arrow_width + sum_junction_radius;
  path_from_measurement
    .attr('d', "M" + start_position_x + " " + start_position_y + " H" + (end_position_x + path_radius)  + 
      "a" + path_radius + "," + path_radius + " 0 0 1 -" + path_radius + ",-" + path_radius + " V" + end_position_y)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', stroke_width)
    .attr('marker-end', "url(#arrowhead)");

  // Draw the junction to the measuring element.
  junction_to_measurement
    .attr('cx', div_system.position().left + div_system.outerWidth() + 
      (div_output.position().left - (div_system.position().left + div_system.outerWidth())) / 2)
    .attr('cy', div_system.position().top + div_system.outerHeight() / 2)
    .attr('r', junction_radius)
    .attr('stroke', 'black');
  
  // Draw the sum-junction.
  sum_junction
    .attr('cx', div_input.position().left + div_input.outerWidth() + 
      (div_controller.position().left - (div_input.position().left + div_input.outerWidth())) / 2)
    .attr('cy', div_input.position().top + div_input.outerHeight() / 2)
    .attr('r', sum_junction_radius)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', stroke_width);

  // Position the plus and minus signs from the sum-junction.
  // Plus.
  let position_x, position_y;
  position_x = div_input.position().left + div_input.outerWidth() + 
    (div_controller.position().left - (div_input.position().left + div_input.outerWidth())) / 2 -
    (sum_junction_radius * 2);
  position_y = div_input.position().top + div_input.outerHeight() / 2 - 
    (sum_junction_radius * 2);
  text_sum_junction_plus
    .attr('x', position_x)
    .attr('y', position_y)
    .attr('font-size', font_size)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .text('+');

  // Minus.
  position_x = div_input.position().left + div_input.outerWidth() + 
    (div_controller.position().left - (div_input.position().left + div_input.outerWidth())) / 2 -
    (sum_junction_radius * 2);
  position_y = div_input.position().top + div_input.outerHeight() / 2 + 
    (sum_junction_radius * 3);
  text_sum_junction_minus
    .attr('x', position_x)
    .attr('y', position_y)
    .attr('font-size', font_size)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .text('-');

  // Position further text.
  // Control difference.
  position_x = div_input.position().left + div_input.outerWidth() + 
    (div_controller.position().left - (div_input.position().left + div_input.outerWidth())) * 3 / 4;
  position_y = div_controller.position().top + div_controller.outerHeight() / 2 - 5 * stroke_width;
  text_control_difference
    .attr('x', position_x)
    .attr('y', position_y)
    .attr('font-size', font_size)
    .attr('alignment-baseline', 'middle')
    .attr('transform', 'rotate(-90, ' + position_x + ', ' + position_y + ')')
    .text('Regelabweichung');

  // Manipulated variable.
  position_x = div_controller.position().left + div_controller.outerWidth() + 
    (div_system.position().left - (div_controller.position().left + div_controller.outerWidth())) / 2;
  position_y = div_controller.position().top + div_controller.outerHeight() / 2 - 5 * stroke_width;
  text_manipulated_variable
    .attr('x', position_x)
    .attr('y', position_y)
    .attr('font-size', font_size)
    .attr('alignment-baseline', 'middle')
    .attr('transform', 'rotate(-90, ' + position_x + ', ' + position_y + ')')
    .text('Stellgröße');
}
// Draw the arrows at page load.
draw_control_loop_arrows();


// This function draws a basic line chart.
function plot_basic_chart(div_svg, data, options) {
  // Clear everything that is currently inside the div-element.
  div_svg.node().innerHTML = '';
  // Get the dimension of the div-element.
  let rect = div_svg.node().getBoundingClientRect();
  // Set the margin, width and height of the plot (needed for the axis).
  var margin = {top: 10, right: 30, bottom: 10, left: 60},
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

  // Set the graph-title.
  plot_svg
    .append("text")
      .attr("x", (width / 2))             
      .attr("y", 10)
      .attr("text-anchor", "middle")  
      .style("font-size", "1rem") 
      .style("text-decoration", "underline")  
      .text(options.title);

  // x-axis.
  let x_axis = d3.scaleLinear()
    .domain([options.x_min, options.x_max]) // Value-range.
    .range([0, width]);   // Pixel-range.
  plot_svg
    .append("g")
      .attr("transform", "translate(0," + height / 2 + ")")
      .call(d3.axisBottom(x_axis));
  // x-axis-label.
  plot_svg
    .append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height / 2 + margin.top + 30)
      .text('Zeit t');

  // y-axis.
  var y_axis = d3.scaleLinear()
    .domain([options.y_min, options.y_max])
    .range([height, 0]);
  plot_svg
    .append("g")
      .call(d3.axisLeft(y_axis));

  // Add the line(s).
  for (let i = 0;  i < options.y_value.length; i++) {
    plot_svg
      .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", options.stroke_color[i])
        .attr("stroke-width", 2)
        .attr("d", d3.line()
          .x(function(d) { return x_axis(d[options.x_value]) })
          .y(function(d) { return y_axis(d[options.y_value[i]]) }));
  }
}


// Classes.
class ControlLoopHandler {
  constructor(control_loop_id) {
    // Create further objects.
    this.control_loop_id = control_loop_id;
    this.control_loop = document.querySelector(control_loop_id);
    this.input = new ControlLoopElementInput(this);
    this.controller = new ControlLoopElementController(this);
    this.system = new ControlLoopElementSystem(this);
    this.measurement = new ControlLoopElementMeasurement(this);
    this.data = [];
    // Update the range slider value labels.
    for (let slider_output of this.control_loop.querySelectorAll('.range_value_output')) {
      slider_output.innerHTML = Number(slider_output.parentNode.querySelector('input').value).toFixed(2);
    }
    // Plot the first time.
    this.calc_and_plot();
  }

  // Iterative calculation of the control loop data.
  calc_and_plot() {
    // Clear the current data.
    this.data = [];
    // Fill the data with the first values.
    this.data.push({
      t: 0,
      w: 0,
      e: 0,
      u: 0,
      y: 0,
      x: 0,
      x_m: 0
    });
    // Iterate and calculate the whole data depending on the chosen parameters.
    for (let t = time_step; t <= time_max; t += time_step) {
      let data_current = {
        t: 0,
        w: 0,
        e: 0,
        u: 0,
        y: 0,
        x: 0,
        x_m: 0
      };
      let data_last = this.data[this.data.length - 1];
      let data_pre_last = this.data[this.data.length - 2];
      if (data_pre_last == undefined) {
        data_pre_last = data_last;
      }
      // The time.
      data_current.t = t;
      // Calculate the input.
      data_current = this.input.calc(data_current);
      // Calculate the error.
      data_current.e = data_current.w - data_last.x_m;
      // Calculate the controller response depending on the chosen controller.
      data_current = this.controller.calc(data_current, data_last, data_pre_last);
      // Maybe we should discuss the next step.
      data_current.y = data_current.u;
      // Calculate the system response.
      data_current = this.system.calc(data_current, data_last, data_pre_last);
      // Measure the current output value.
      data_current = this.measurement.calc(data_current, data_last);
      // Append the current data to the whole data.
      this.data.push(data_current);
    }
    // Plot the three diagrams.
    this.input.plot(this.data);
    this.controller.plot(this.data);
    this.system.plot(this.data);
  }
}

class ControlLoopElementInput {
  constructor(control_loop_handler) {
    // General attributes.
    this.control_loop_handler = control_loop_handler;
    this.control_loop_element = this.control_loop_handler.control_loop.querySelector('#input_variable');
    this.selection = this.control_loop_element.querySelector('.control_loop_dropdown');
    this.div_svg = d3.select(this.control_loop_handler.control_loop_id + ' #input_plot');
    // Input type and small visualization.
    this.type = this.selection.value;
    this.input_visualization_image = this.control_loop_element.querySelector('#input_visualization');
    this.selection.addEventListener('change', (event) => {
      // Change the type and the image.
      this.type = this.selection.value;
      this.input_visualization_image.src = 'img/' + this.type + '.png';
      // Redraw the plots.
      this.control_loop_handler.calc_and_plot();
    });
  }

  // Calculate the input.
  calc(data_current) {
    if (this.type == 'step') {
      data_current.w = 1;
    }
    else if (input_selection.value == 'impulse') {
      if (data_current.t == time_step) {
        data_current.w = 1 / time_step;
      }
      else {
        data_current.w = 0;
      }
    }
    else if (input_selection.value == 'sinus') {
      data_current.w = Math.sin(data_current.t);
    }
    return data_current;
  }

  // Plot the input signal.
  plot(data) {
    // Create a basic chart and add the line.
    plot_basic_chart(this.div_svg, data, 
      {x_min: 0, x_max: time_max, y_min: -2, y_max: 2, x_value: 't', 
      y_value: ['w', 'e'], stroke_color: ['#0005', '#012a4a'], title: 'Regelabweichung (im Vergleich zum Sollwert)'});
  }
}

class ControlLoopElementController {
  constructor(control_loop_handler) {
    // General attributes.
    this.control_loop_handler = control_loop_handler;
    this.control_loop_element = this.control_loop_handler.control_loop.querySelector('#controller');
    this.selection = this.control_loop_element.querySelector('.control_loop_dropdown');
    this.div_svg = d3.select(this.control_loop_handler.control_loop_id + ' #control_plot');
    // Parameter.
    this.parameter = {};
    // Controller type.
    this.range_slider_box = this.control_loop_handler.control_loop.querySelector('#controller_range_slider_box');
    this.range_slider_k = this.range_slider_box.querySelector('#controller_range_k');
    this.range_slider_k_output = this.range_slider_k.parentNode.querySelector('.range_value_output');
    this.parameter.K = parseFloat(this.range_slider_k.value);
    this.range_slider_k.addEventListener('input', (event) => {
      this.parameter.K = parseFloat(this.range_slider_k.value);
      this.range_slider_k_output.innerHTML = Number(this.parameter.K).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.range_slider_ti = this.range_slider_box.querySelector('#controller_range_ti');
    this.range_slider_ti_output = this.range_slider_ti.parentNode.querySelector('.range_value_output');
    this.parameter.Ti = parseFloat(this.range_slider_ti.value);
    this.range_slider_ti.addEventListener('input', (event) => {
      this.parameter.Ti = parseFloat(this.range_slider_ti.value);
      this.range_slider_ti_output.innerHTML = Number(this.parameter.Ti).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.range_slider_td = this.range_slider_box.querySelector('#controller_range_td');
    this.range_slider_td_output = this.range_slider_td.parentNode.querySelector('.range_value_output');
    this.parameter.Td = parseFloat(this.range_slider_td.value);
    this.range_slider_td.addEventListener('input', (event) => {
      this.parameter.Td = parseFloat(this.range_slider_td.value);
      this.range_slider_td_output.innerHTML = Number(this.parameter.Td).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.range_slider_tn = this.range_slider_box.querySelector('#controller_range_tn');
    this.range_slider_tn_output = this.range_slider_tn.parentNode.querySelector('.range_value_output');
    this.parameter.Tn = parseFloat(this.range_slider_tn.value);
    this.range_slider_tn.addEventListener('input', (event) => {
      this.parameter.Tn = parseFloat(this.range_slider_tn.value);
      this.range_slider_tn_output.innerHTML = Number(this.parameter.Tn).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.range_slider_tv = this.range_slider_box.querySelector('#controller_range_tv');
    this.range_slider_tv_output = this.range_slider_tv.parentNode.querySelector('.range_value_output');
    this.parameter.Tv = parseFloat(this.range_slider_tv.value);
    this.range_slider_tv.addEventListener('input', (event) => {
      this.parameter.Tv = parseFloat(this.range_slider_tv.value);
      this.range_slider_tv_output.innerHTML = Number(this.parameter.Tv).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.type = this.selection.value;
    this.selection.addEventListener('change', (event) => {
      // Change the type.
      this.type = this.selection.value;
      // Toggle the visibility of the range sliders.
      this.toggle_range_slider_visibility();
      // Redraw the plots.
      this.control_loop_handler.calc_and_plot();
    });
    // Toggle the visibility once.
    this.toggle_range_slider_visibility();
  }

  // Toggle the visibility of the range sliders.
  toggle_range_slider_visibility() {
    if (this.type == 'P') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_ti.parentNode.style.display = 'none';
      this.range_slider_td.parentNode.style.display = 'none';
      this.range_slider_tn.parentNode.style.display = 'none';
      this.range_slider_tv.parentNode.style.display = 'none';
    }
    else if (this.type == 'I') {
      this.range_slider_k.parentNode.style.display = 'none';
      this.range_slider_ti.parentNode.style.display = 'flex';
      this.range_slider_td.parentNode.style.display = 'none';
      this.range_slider_tn.parentNode.style.display = 'none';
      this.range_slider_tv.parentNode.style.display = 'none';
    }
    else if (this.type == 'D') {
      this.range_slider_k.parentNode.style.display = 'none';
      this.range_slider_ti.parentNode.style.display = 'none';
      this.range_slider_td.parentNode.style.display = 'flex';
      this.range_slider_tn.parentNode.style.display = 'none';
      this.range_slider_tv.parentNode.style.display = 'none';
    }
    else if (this.type == 'PI') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_ti.parentNode.style.display = 'none';
      this.range_slider_td.parentNode.style.display = 'none';
      this.range_slider_tn.parentNode.style.display = 'flex';
      this.range_slider_tv.parentNode.style.display = 'none';
    }
    else if (this.type == 'PD') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_ti.parentNode.style.display = 'none';
      this.range_slider_td.parentNode.style.display = 'none';
      this.range_slider_tn.parentNode.style.display = 'none';
      this.range_slider_tv.parentNode.style.display = 'flex';
    }
    else if (this.type == 'PID') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_ti.parentNode.style.display = 'none';
      this.range_slider_td.parentNode.style.display = 'none';
      this.range_slider_tn.parentNode.style.display = 'flex';
      this.range_slider_tv.parentNode.style.display = 'flex';
    }
  }

  // Calculate the controller response depending on the chosen controller.
  calc(data_current, data_last, data_pre_last) {
    data_current.u = 0;
    if (this.type == 'P') {
      data_current.u = data_current.e * this.parameter.K;
    }
    else if (this.type == 'I') {
      data_current.u = data_last.u + data_current.e * (time_step / this.parameter.Ti);
    }
    else if (this.type == 'D') {
      data_current.u = data_current.e * ((2*this.parameter.Td)/(20*this.parameter.Td - time_step)) + data_last.e * (-(2*this.parameter.Td)/(20*this.parameter.Td - time_step)) - data_last.u * (-(20*this.parameter.Td + time_step)/(20*this.parameter.Td - time_step));
    }
    else if (this.type == 'PI') {
      data_current.u = data_current.e * ((this.parameter.K*this.parameter.Tn + this.parameter.K*time_step)/this.parameter.Tn) + data_last.e * (-this.parameter.K) - data_last.u * (-1);
      //data_current.u = data_current.e * ((2*this.parameter.K*this.parameter.Tn + this.parameter.K*time_step)/(2*this.parameter.Tn)) + data_last.e * (-(2*this.parameter.K*this.parameter.Tn - this.parameter.K*time_step)/(2*this.parameter.Tn)) - data_last.u * (-1);
    }
    else if (this.type == 'PD') {
      data_current.u = data_current.e * ((22*this.parameter.K*this.parameter.Tv - this.parameter.K*time_step)/(20*this.parameter.Tv - time_step)) + data_last.e * (-(22*this.parameter.K*this.parameter.Tv + this.parameter.K*time_step)/(20*this.parameter.Tv - time_step)) - data_last.u * (-(20*this.parameter.Tv + time_step)/(20*this.parameter.Tv - time_step));
    }
    else if (this.type == 'PID') {
      data_current.u = data_current.e * ((11*this.parameter.K)/10) + data_last.e * (-(22*this.parameter.K*this.parameter.Tn*this.parameter.Tv + this.parameter.K*this.parameter.Tn*time_step + 10*this.parameter.K*this.parameter.Tv*time_step)/(10*this.parameter.Tn*this.parameter.Tv)) + data_pre_last.e * ((this.parameter.K*time_step^2 + 11*this.parameter.K*this.parameter.Tn*this.parameter.Tv + this.parameter.K*this.parameter.Tn*time_step + 10*this.parameter.K*this.parameter.Tv*time_step)/(10*this.parameter.Tn*this.parameter.Tv)) - data_last.u * (-(20*this.parameter.Tn*this.parameter.Tv + this.parameter.Tn*time_step)/(10*this.parameter.Tn*this.parameter.Tv)) - data_pre_last.u * ((10*this.parameter.Tn*this.parameter.Tv + this.parameter.Tn*time_step)/(10*this.parameter.Tn*this.parameter.Tv));
    }
    if (isFinite(data_current.u) == false) {
      data_current.u = 0;
    }
    return data_current;
  }

  // Plot the controller signal.
  plot(data) {
    // Create a basic chart and add the line.
    plot_basic_chart(this.div_svg, data, 
      {x_min: 0, x_max: time_max, y_min: -2, y_max: 2, x_value: 't', 
      y_value: ['u'], stroke_color: ['#012a4a'], title: 'Stellgröße'});
  }
}

class ControlLoopElementSystem {
  constructor(control_loop_handler) {
    // General attributes.
    this.control_loop_handler = control_loop_handler;
    this.control_loop_element = this.control_loop_handler.control_loop.querySelector('#controlled_system');
    this.selection = this.control_loop_element.querySelector('.control_loop_dropdown');
    this.div_svg = d3.select(this.control_loop_handler.control_loop_id + ' #output_plot');
    // Parameter.
    this.parameter = {};
    // Controller type.
    this.range_slider_box = this.control_loop_handler.control_loop.querySelector('#system_range_slider_box');
    this.range_slider_k = this.range_slider_box.querySelector('#system_range_k');
    this.range_slider_k_output = this.range_slider_k.parentNode.querySelector('.range_value_output');
    this.parameter.K = parseFloat(this.range_slider_k.value);
    this.range_slider_k.addEventListener('input', (event) => {
      this.parameter.K = parseFloat(this.range_slider_k.value);
      this.range_slider_k_output.innerHTML = Number(this.parameter.K).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.range_slider_t = this.range_slider_box.querySelector('#system_range_t');
    this.range_slider_t_output = this.range_slider_t.parentNode.querySelector('.range_value_output');
    this.parameter.T = parseFloat(this.range_slider_t.value);
    this.range_slider_t.addEventListener('input', (event) => {
      this.parameter.T = parseFloat(this.range_slider_t.value);
      this.range_slider_t_output.innerHTML = Number(this.parameter.T).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.range_slider_d = this.range_slider_box.querySelector('#system_range_d');
    this.range_slider_d_output = this.range_slider_d.parentNode.querySelector('.range_value_output');
    this.parameter.D = parseFloat(this.range_slider_d.value);
    this.range_slider_d.addEventListener('input', (event) => {
      this.parameter.D = parseFloat(this.range_slider_d.value);
      this.range_slider_d_output.innerHTML = Number(this.parameter.D).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.range_slider_omega = this.range_slider_box.querySelector('#system_range_omega');
    this.range_slider_omega_output = this.range_slider_omega.parentNode.querySelector('.range_value_output');
    this.parameter.omega = parseFloat(this.range_slider_omega.value);
    this.range_slider_omega.addEventListener('input', (event) => {
      this.parameter.omega = parseFloat(this.range_slider_omega.value);
      this.range_slider_omega_output.innerHTML = Number(this.parameter.omega).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.type = this.selection.value;
    this.selection.addEventListener('change', (event) => {
      // Change the type.
      this.type = this.selection.value;
      // Toggle the visibility of the range sliders.
      this.toggle_range_slider_visibility();
      // Redraw the plots.
      this.control_loop_handler.calc_and_plot();
    });
    this.selection.value = 'PT1';
    this.type = 'PT1';
    // Toggle the visibility once.
    this.toggle_range_slider_visibility();
  }

  // Toggle the visibility of the range sliders.
  toggle_range_slider_visibility() {
    if (this.type == 'PT0') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_t.parentNode.style.display = 'none';
      this.range_slider_d.parentNode.style.display = 'none';
      this.range_slider_omega.parentNode.style.display = 'none';
    }
    else if (this.type == 'PT1') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_t.parentNode.style.display = 'flex';
      this.range_slider_d.parentNode.style.display = 'none';
      this.range_slider_omega.parentNode.style.display = 'none';
    }
    else if (this.type == 'PT2') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_t.parentNode.style.display = 'flex';
      this.range_slider_d.parentNode.style.display = 'flex';
      this.range_slider_omega.parentNode.style.display = 'flex';
    }
  }

  // Calculate the controller response depending on the chosen system.
  calc(data_current, data_last, data_pre_last) {
    data_current.x = 0;
    if (this.type == 'PT0') {
      data_current.x = data_current.y * this.parameter.K;
    }
    else if (this.type == 'PT1') {
      //data_current.x = data_last.x + (this.parameter.K * data_current.y - data_last.x) * 
      //  (time_step / (this.parameter.T + time_step));
      data_current.x = ((this.parameter.K * time_step) / (2 * this.parameter.T + time_step)) * (data_current.y + data_last.y) -
        ((time_step - 2 * this.parameter.T) / (time_step + 2 * this.parameter.T)) * data_last.x; 
    }
    else if (this.type == 'PT2') {
      data_current.x = data_current.y * (0) + data_last.y * (0) + data_pre_last.y * ((this.parameter.K*time_step^2)/(this.parameter.D*this.parameter.T)) - data_last.x * (-(2*this.parameter.D*this.parameter.T + this.parameter.D*time_step + this.parameter.T*time_step)/(this.parameter.D*this.parameter.T)) - data_pre_last.x * ((this.parameter.D*this.parameter.T + this.parameter.D*time_step + this.parameter.T*time_step + time_step^2)/(this.parameter.D*this.parameter.T));
    }
    if (isFinite(data_current.x) == false) {
      data_current.x = 0;
    }
    return data_current;
  }

  // Plot the controller signal.
  plot(data) {
    // Create a basic chart and add the line.
    plot_basic_chart(this.div_svg, data, 
      {x_min: 0, x_max: time_max, y_min: -2, y_max: 2, x_value: 't', 
      y_value: ['w', 'x'], stroke_color: ['#0005', '#012a4a'], title: 'Regelgröße (im Vergleich zum Sollwert)'});
  }
}

class ControlLoopElementMeasurement {
  constructor(control_loop_handler) {
    // General attributes.
    this.control_loop_handler = control_loop_handler;
    this.control_loop_element = this.control_loop_handler.control_loop.querySelector('#measuring_element');
    this.selection = this.control_loop_element.querySelector('.control_loop_dropdown');
    // Parameter.
    this.parameter = {};
    // Controller type.
    this.range_slider_box = this.control_loop_handler.control_loop.querySelector('#measurement_range_slider_box');
    this.range_slider_k = this.range_slider_box.querySelector('#measurement_range_k');
    this.range_slider_k_output = this.range_slider_k.parentNode.querySelector('.range_value_output');
    this.parameter.K = parseFloat(this.range_slider_k.value);
    this.range_slider_k.addEventListener('input', (event) => {
      this.parameter.K = parseFloat(this.range_slider_k.value);
      this.range_slider_k_output.innerHTML = Number(this.parameter.K).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.range_slider_t = this.range_slider_box.querySelector('#measurement_range_t');
    this.range_slider_t_output = this.range_slider_t.parentNode.querySelector('.range_value_output');
    this.parameter.T = parseFloat(this.range_slider_t.value);
    this.range_slider_t.addEventListener('input', (event) => {
      this.parameter.T = parseFloat(this.range_slider_t.value);
      this.range_slider_t_output.innerHTML = Number(this.parameter.T).toFixed(2);
      this.control_loop_handler.calc_and_plot();
    })
    this.type = this.selection.value;
    this.selection.addEventListener('change', (event) => {
      // Change the type.
      this.type = this.selection.value;
      // Toggle the visibility of the range sliders.
      this.toggle_range_slider_visibility();
      // Redraw the plots.
      this.control_loop_handler.calc_and_plot();
    });
    // Toggle the visibility once.
    this.toggle_range_slider_visibility();
  }

  // Toggle the visibility of the range sliders.
  toggle_range_slider_visibility() {
    if (this.type == 'P') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_t.parentNode.style.display = 'none';
    }
    else if (this.type == 'PT1') {
      this.range_slider_k.parentNode.style.display = 'flex';
      this.range_slider_t.parentNode.style.display = 'flex';
    }
  }

  // Calculate the controller response depending on the chosen controller.
  calc(data_current, data_last) {
    data_current.x_m = 0;
    if (this.type == 'P') {
      data_current.x_m = data_current.x * this.parameter.K;
    }
    else if (this.type == 'PT1') {
      data_current.x_m = data_last.x_m + (this.parameter.K * data_current.x - data_last.x_m) * 
        (time_step / (this.parameter.T + time_step));
    }
    if (isFinite(data_current.x_m) == false) {
      data_current.x_m = 0;
    }
    return data_current;
  }
}

// The control loop handler.
let control_loop_handler = new ControlLoopHandler('#main_control_loop');