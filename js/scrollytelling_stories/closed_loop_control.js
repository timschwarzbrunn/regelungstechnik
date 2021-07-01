story_closed_loop_control = {
    title: 'Regeln eines Systems.',
    content: [
        {
            section_html_text: 'Der <b>Regler</b> hat als Element des Regelkreises die Aufgabe, das System in den gewünschten Zustand zu überführen oder den gewünschten Zustand zu halten, sollten Störungen auf das System einwirken.',
            control_loop_behaviour: {
                marked: ['#controller'],
                value: [
                    {
                        element_id: '#input_selection',
                        value: 'step'
                    },
                    {
                        element_id: '#controller_selection',
                        value: 'P'
                    },
                    {
                        element_id: '#controller_range_k',
                        value: 1
                    },
                    {
                        element_id: '#system_selection',
                        value: 'PT1'
                    },
                    {
                        element_id: '#system_range_k',
                        value: 1
                    },
                    {
                        element_id: '#system_range_t',
                        value: 2
                    },
                    {
                        element_id: '#measurement_selection',
                        value: 'P'
                    },
                    {
                        element_id: '#measurement_range_k',
                        value: 1
                    }
                ]
            }
        },
        {
            section_html_text: 'Als Eingangssingal erhält der Regler die <b>Regelabweichung</b>. Diese berechnet sich aus der Differenz des Sollwertes und der momentan gemessenen Regelgröße.',
            control_loop_behaviour: {
                marked: ['#path_from_measurement', '#line_input_to_sum_junction', '#line_sum_junction_to_controller', '#sum_junction', '#text_sum_junction_plus', '#text_sum_junction_minus']
            }
        },
        {
            section_html_text: 'Auf die Regelabweichung kann der Regler unterschiedlich reagieren. Je nach Auslegung, kann er ein proportionales (P), integrierendes (I) oder differenzierendes (D) Verhalten aufweisen. Auch Kombinationen sind möglich (z.B. PI).<br><br>Probiere es selber aus und beobachte, wie sich der Kurvenverlauf verändert.',
            control_loop_behaviour: {
                marked: ['#controller_selection']
            }
        },
        {
            section_html_text: 'Der Regler gibt der Regelstrecke die <b>Stellgröße</b> vor. Dies ist die Variable eines technischen Systems, über welche sich der Ausgang des Systems beeinflussen lässt. Zum Beispiel ändert sich die Drehzahl eines DC-Elektromotors (Regelgröße) in Abhängigkeit der anliegenden Spannung (Stellgröße).',
            control_loop_behaviour: {
                marked: ['#line_controller_to_system']
            }
        },
        {
            section_html_text: 'Zu beachten ist, dass der Wert der Stellgröße (<b>Stellgrößenaufwand</b>) innerhalb der technischen Möglichkeiten bleibt. Beispielsweise führt ein hoher Verstärkungsfaktor eines P-Reglers zwar zu einer geringen bleibenden Regelabweichung, aber die Stellgröße steigt stark an und ist ggf. technisch nicht mehr realisierbar.',
            control_loop_behaviour: {
                marked: ['#control_plot'],
                value: [
                    {
                        element_id: '#input_selection',
                        value: 'step'
                    },
                    {
                        element_id: '#controller_selection',
                        value: 'P'
                    },
                    {
                        element_id: '#controller_range_k',
                        value: 10
                    },
                    {
                        element_id: '#system_selection',
                        value: 'PT1'
                    },
                    {
                        element_id: '#system_range_k',
                        value: 1
                    },
                    {
                        element_id: '#system_range_t',
                        value: 2
                    },
                    {
                        element_id: '#measurement_selection',
                        value: 'P'
                    },
                    {
                        element_id: '#measurement_range_k',
                        value: 1
                    }
                ]
            }
        },
    ],
    videos: [
        'https://www.youtube.com/embed/5X5sue-xPfI',
        'https://www.youtube.com/embed/Ybzg8rOe-8E',
        'https://www.youtube.com/embed/neaMBjRuNHI'
    ]
}