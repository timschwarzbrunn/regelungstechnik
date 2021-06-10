// This function transforms the control loop depending on the desired behaviour.
function control_loop_transformation(control_loop_id, control_loop_behaviour, mode) {
    let control_loop = document.querySelector(control_loop_id);
    // Go through every possible setting.
    // Mark elements.
    if (control_loop_behaviour['marked'] != undefined) {
        for (element_id of control_loop_behaviour['marked']) {
            if (mode == 'enter') {
                control_loop.querySelector(element_id).classList.add('marked');
            }
            else if (mode == 'exit') {
                try {
                    control_loop.querySelector(element_id).classList.remove('marked');
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
    }
    // Disable elements.

    // Hide elements.
    // The elements will not be shown after the current section. They need to be unhidden manually.
    if (control_loop_behaviour['hidden'] != undefined) {
        if (mode == 'enter') {
            for (element_id of control_loop_behaviour['hidden']) {
                control_loop.querySelector(element_id).classList.add('hidden');
            }
        }
    }
    // Unhide elements.
    if (control_loop_behaviour['unhidden'] != undefined) {
        if (mode == 'enter') {
            for (element_id of control_loop_behaviour['unhidden']) {
                try {
                    control_loop.querySelector(element_id).classList.remove('hidden');
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
    }
    // Change values of elements (only when entering the waypoint).
    if (control_loop_behaviour['value'] != undefined) {
        if (mode == 'enter') {
            for (value_options of control_loop_behaviour['value']) {
                let element = control_loop.querySelector(value_options.element_id);
                element.value = value_options.value;
                // Trigger the events.
                element.dispatchEvent(new Event('change'));
                element.dispatchEvent(new Event('input'));
            }
        }
    }
}

// Progressbar.
function update_progressbar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.querySelector('.progress_bar').style.width = scrolled + "%";
}
window.onscroll = function() {
    update_progressbar()
};


// This function loads a new story to the scrollytelling sidebar.
function update_scrollytelling(scrollytelling_content) {
    // Show the progressbar.
    document.querySelector('.progress_container').style.visibility = 'visible';
    document.querySelector('.progress_bar').style.width = '0%';
    // Delete the old scrollytelling.
    let scrollytelling = document.querySelector('#scrollytelling_article');
    scrollytelling.innerHTML = '';
    // Add a sticky back-button to get into the main menu again.
    let backbutton_wrapper = document.createElement('div');
    backbutton_wrapper.classList.add('backbutton_wrapper');
    let backbutton = document.createElement('button');
    backbutton.innerHTML = '&#8617;';
    backbutton.classList.add('backbutton');
    backbutton.addEventListener('click', function() {
        Waypoint.destroyAll();
        // Remove all assigned classes during scrollytelling.
        for (let element of document.querySelectorAll('#main_control_loop *')) {
            try {
                element.classList.remove('marked');
            }
            catch (error) {}
            try {
                element.classList.remove('hidden');
            }
            catch (error) {}
        }
        show_main_menu();
    });
    backbutton_wrapper.appendChild(backbutton);
    scrollytelling.appendChild(backbutton_wrapper);
    // Add the scroll section header at the top.
    let scroll_section_header = document.createElement('div');
    scroll_section_header.classList.add('scroll_section_header');
    let scroll_section_header_content = document.createElement('div');
    scroll_section_header_content.classList.add('scroll_section_content');
    scroll_section_header_content.innerText = scrollytelling_content.title;
    scroll_section_header.appendChild(scroll_section_header_content);
    scrollytelling.appendChild(scroll_section_header);
    // Add the content.
    for (let content of scrollytelling_content.content) {
        let scroll_section = document.createElement('div');
        scroll_section.classList.add('scroll_section');
        let scroll_section_content = document.createElement('div');
        scroll_section_content.classList.add('scroll_section_content');
        scroll_section_content.innerHTML = content.section_html_text;
        // Disable the waypoint at beginning because otherwise it would fire when created.
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
            },
            enabled: false
        });
        scroll_section.appendChild(scroll_section_content);
        scrollytelling.appendChild(scroll_section);
    }
    // Add the scroll section filler at the bottom.
    let scroll_section_footer = document.createElement('div');
    scroll_section_footer.classList.add('scroll_section_footer');
    let scroll_section_footer_content = document.createElement('div');
    scroll_section_footer_content.classList.add('scroll_section_content');
    if (scrollytelling_content['videos'] != undefined) {
        scroll_section_footer_content.innerText = "Weiterführende Videos";
        // Go to the youtube-video, click on Share --> Embed and copy the src-part of the code into the content.
        for (video_src of scrollytelling_content.videos) {
            scroll_section_footer_content.innerHTML += '<iframe src="' + video_src + 
                '" title="YouTube video player" frameborder="0" ' + 
                'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' + 
                'allowfullscreen></iframe>';
        }
    }
    scroll_section_footer.appendChild(scroll_section_footer_content);
    scrollytelling.appendChild(scroll_section_footer);
    
    // Enable all waypoints with a little delay in order to prevent them from firing when created.
    // https://github.com/imakewebthings/waypoints/issues/355
    setTimeout(function(){
        Waypoint.enableAll();
    }, 250);
}

// This function shows the main menue. It will be shown at start and when closing a story.
function show_main_menu() {
    // Hide the progressbar.
    document.querySelector('.progress_container').style.visibility = 'hidden';
    // Delete the old scrollytelling to make space for the main menu.
    let scrollytelling = document.querySelector('#scrollytelling_article');
    scrollytelling.innerHTML = '';
    // Add the title.
    let main_menu_title = document.createElement('div');
    main_menu_title.classList.add('main_menu_title');
    main_menu_title.innerText = 'Verfügbare Lerninhalte';
    scrollytelling.appendChild(main_menu_title);
    // Add the entries.
    for (let entry of scrollytelling_chapter_overview) {
        if (entry['title'] == undefined) {
            continue;
        }
        let main_menu_entry = document.createElement('div');
        main_menu_entry.classList.add('main_menu_entry');
        main_menu_entry.innerText = entry.title;
        main_menu_entry.addEventListener('click', (event) => {
            update_scrollytelling(entry);
        });
        scrollytelling.appendChild(main_menu_entry);
    }
}

// Show the main menu at start.
show_main_menu();
//update_scrollytelling(story_fundamentals_of_control_systems_engineering);

