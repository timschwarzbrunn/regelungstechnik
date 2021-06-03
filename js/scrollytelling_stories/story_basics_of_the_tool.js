story_basics_ot_the_tool = {
    title: 'Funktionalitäten des Tools',
    content: [
                {
                    section_html_text: 'Das Tool zeigt auf der linken Seite den <b>Regelkreis</b> und zusätzlich drei <b>Diagramme</b>. ' + 
                        'Auf der rechten Seite befindet sich die <b>Scrollytelling</b>-Spalte.',
                    control_loop_behaviour: {
                        
                    }
                },
                {
                    section_html_text: 'Das erste Diagramm visualisiert den <b>Sollwert</b> und die <b>Regelabweichung</b>.',
                    control_loop_behaviour: {
                        marked: ['#input_plot']
                    }
                },
                {
                    section_html_text: 'Der <b>Sollwert (die Anregungsfunktion)</b> kann über ein Dropdown-Menü verändert werden.',
                    control_loop_behaviour: {
                        marked: ['#input_selection']
                    }
                },
                {
                    section_html_text: 'Das zweite Diagramm visualisiert die <b>Stellgröße</b>.',
                    control_loop_behaviour: {
                        marked: ['#control_plot']
                    }
                },
                {
                    section_html_text: 'Die Stellgröße ist abhängig von dem ausgewählten Regler-Typ (und System) sowie den eingestellten Parametern.',
                    control_loop_behaviour: {
                        marked: ['#controller']
                    }
                },
                {
                    section_html_text: 'Parameter können auch über Javascript verändert werden, um dies in die Erläuterung einzubauen.<br><br> ' + 
                        'Beispielsweise wurde in diesem Abschnitt der Reglertyp auf P-Regler gestellt und der Verstärkungsfaktor erhöht. ' + 
                        'Dies führt zu einem hohen <b>Stellgrößenaufwand</b>, der technisch schwieriger wird umzusetzen.',
                    control_loop_behaviour: {
                        marked: ['#range_slider_controller_k', '#controller_selection'],
                        value: [
                            {
                                element_id: '#controller_range_k',
                                value: 10
                            }
                        ]
                    }
                },
                {
                    section_html_text: 'Auch die <b>Regelstrecke</b> kann in ihrem Typ und ihren Parametern angepasst werden.<br><br>' + 
                        'Bei der Aufstellung der <b>Differenzengleichung für die PT2-Strecke</b> habe ich noch Probleme.',
                    control_loop_behaviour: {
                        marked: ['#controlled_system']
                    }
                },
                {
                    section_html_text: 'Das dritte Diagramm visualisiert die <b>Regelgröße</b>.',
                    control_loop_behaviour: {
                        marked: ['#output_plot']
                    }
                },
                {
                    section_html_text: 'Auch das <b>Messglied</b> kann parametrisiert werden.',
                    control_loop_behaviour: {
                        marked: ['#measuring_element'],
                        unhidden: ['#measuring_element', '#line_to_measurement', '#line_from_measurement'],
                    }
                },
                {
                    section_html_text: 'Wenn der Verstärkungsfaktor des <b>Messglieds</b> auf Null gesetzt wird, wird eine Steuerung realisiert.<br><br>' +
                        'Das Systemverhalten kann somit analysiert werden, wenn zusätzlich auch der Verstärkungsfaktor eines P-Reglers auf 1 gesetzt wird.',
                    control_loop_behaviour: {
                        hidden: ['#measuring_element', '#line_to_measurement', '#line_from_measurement'],
                        value: [
                            {
                                element_id: '#controller_selection',
                                value: 'P'
                            },
                            {
                                element_id: '#controller_range_k',
                                value: 1
                            },
                            {
                                element_id: '#measurement_selection',
                                value: 'P'
                            },
                            {
                                element_id: '#measurement_range_k',
                                value: 0
                            }
                        ]
                    }
                },
                {
                    section_html_text: 'Am Ende des Scrollytellings sind <b>weiterführende Videos</b> verlinkt.',
                    control_loop_behaviour: {
                        unhidden: ['#measuring_element', '#line_to_measurement', '#line_from_measurement'],
                    }
                },
            ],
    videos: [
        'https://www.youtube.com/embed/l26IGS2RlM0',
        'https://www.youtube.com/embed/1L07JzTJITw'
    ]
}