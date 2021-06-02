function control_loop_transformation(control_loop_id, control_loop_behaviour, mode) {
    let control_loop = document.querySelector(control_loop_id);
    // Go through every possible setting.
    if (control_loop_behaviour['input_variable'] != undefined) {
        if (mode == 'enter') {
            control_loop.querySelector('#input_variable').classList.add(
                control_loop_behaviour['input_variable']);
        }
        else if (mode == 'exit') {
            control_loop.querySelector('#input_variable').classList.remove(
                control_loop_behaviour['input_variable']);
        }
    }
    if (control_loop_behaviour['controller'] != undefined) {
        if (mode == 'enter') {
            control_loop.querySelector('#controller').classList.add(
                control_loop_behaviour['controller']);
        }
        else if (mode == 'exit') {
            control_loop.querySelector('#controller').classList.remove(
                control_loop_behaviour['controller']);
        }
    }
    if (control_loop_behaviour['controlled_system'] != undefined) {
        if (mode == 'enter') {
            control_loop.querySelector('#controlled_system').classList.add(
                control_loop_behaviour['controlled_system']);
        }
        else if (mode == 'exit') {
            control_loop.querySelector('#controlled_system').classList.remove(
                control_loop_behaviour['controlled_system']);
        }
    }
    if (control_loop_behaviour['output_variable'] != undefined) {
        if (mode == 'enter') {
            control_loop.querySelector('#output_variable').classList.add(
                control_loop_behaviour['output_variable']);
        }
        else if (mode == 'exit') {
            control_loop.querySelector('#output_variable').classList.remove(
                control_loop_behaviour['output_variable']);
        }
    }
    if (control_loop_behaviour['measuring_element'] != undefined) {
        if (mode == 'enter') {
            control_loop.querySelector('#measuring_element').classList.add(
                control_loop_behaviour['measuring_element']);
        }
        else if (mode == 'exit') {
            control_loop.querySelector('#measuring_element').classList.remove(
                control_loop_behaviour['measuring_element']);
        }
    }
}


scrollytelling_content = [
    {
        section_html_text: '<b>Sollgröße</b> wird hier erläutert.',
        control_loop_behaviour: {
            input_variable: 'marked'
        }
    },
    {
        section_html_text: '<b>Regler</b> wird hier erläutert.',
        control_loop_behaviour: {
            controller: 'marked'
        }
    },
    {
        section_html_text: '<b>Regelstrecke</b> wird hier erläutert.',
        control_loop_behaviour: {
            controlled_system: 'marked'
        }
    },
    {
        section_html_text: '<b>Regelgröße</b> wird hier erläutert.',
        control_loop_behaviour: {
            output_variable: 'marked'
        }
    },
    {
        section_html_text: '<b>Messglied</b> wird hier erläutert.',
        control_loop_behaviour: {
            measuring_element: 'marked'
        }
    },
]

let scrollytelling = document.querySelector('article');
scrollytelling.innerHTML = '';
// Add the scroll section filler at the top.
let scroll_section_filler_top = document.createElement('div');
scroll_section_filler_top.classList.add('scroll_section_filler');
scrollytelling.appendChild(scroll_section_filler_top);
// Add the content.
for (let content of scrollytelling_content) {
    let scroll_section = document.createElement('div');
    scroll_section.classList.add('scroll_section');
    let scroll_section_content = document.createElement('div');
    scroll_section_content.classList.add('scroll_section_content');
    scroll_section_content.innerHTML = content.section_html_text;
    var waypoint = new Waypoint.Inview({
        element: scroll_section,
        entered: function(direction) {
            control_loop_transformation('#main_control_loop', content.control_loop_behaviour, 'enter');
            // Show it.
            this.element.style.opacity = 1;
        },
        exit: function(direction) {
            control_loop_transformation('#main_control_loop', content.control_loop_behaviour, 'exit');
            // Hide it.
            this.element.style.opacity = 0;
        }
    });
    scroll_section.appendChild(scroll_section_content);
    scrollytelling.appendChild(scroll_section);
}
// Add the scroll section filler at the bottom.
let scroll_section_filler_bottom = document.createElement('div');
scroll_section_filler_bottom.classList.add('scroll_section_filler');
scrollytelling.appendChild(scroll_section_filler_bottom);
