story_measuring_element = {
    title: 'Der Einfluss des Messglieds.',
    content: [
        {
            section_html_text: 'Das <b>Messglied</b> hat die Aufgabe, die Regelgröße zu messen und im Regelkreis rückzuführen, damit sie mit dem Sollwert verglichen werden kann.',
            control_loop_behaviour: {
                marked: ['#measuring_element'],
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
            section_html_text: 'Meist wird zur Vereinfachung das <b>Messglied</b> als reines P-Glied mit einem Verstärkungsfaktor von 1 und keiner Zeitkonstanten angenommen. Somit hat das Messglied keinen Einfluss auf das Regelkreisverhalten.',
            control_loop_behaviour: {
                marked: ['#measuring_element'],
                value: [
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
            section_html_text: 'In der Realität ist es jedoch häufig so, dass Messinstrumente ebenfalls eine gewisse Zeit benötigen, bis der tatsächliche Wert vorliegt. Zum Beispiel benötigt ein Thermometer eine gewisse Zeit, bis der Fühler die zu messende Temperatur angenommen hat. Dies führt zu einem <b>PT1-Verhalten</b>.',
            control_loop_behaviour: {
                marked: ['#measuring_element'],
                value: [
                    {
                        element_id: '#measurement_selection',
                        value: 'PT1'
                    },
                    {
                        element_id: '#measurement_range_k',
                        value: 1
                    },
                    {
                        element_id: '#measurement_range_t',
                        value: 2
                    }
                ]
            }
        },
        {
            section_html_text: 'Zu beachten ist, dass dabei das Messinstrument im Vergleich zur Trägheit des zu regelnden Systems nicht zu langsam ist. Wird der tatsächlich vorliegende Wert viel später gemessen, als er tatsächlich vorliegt, kann dies zu Überschwingern im Regelprozess führen.',
            control_loop_behaviour: {
                marked: ['#controlled_system', '#measuring_element'],
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
                        value: 5
                    },
                    {
                        element_id: '#system_selection',
                        value: 'PT1'
                    },
                    {
                        element_id: '#system_range_k',
                        value: 0.5
                    },
                    {
                        element_id: '#system_range_t',
                        value: 0.5
                    },
                    {
                        element_id: '#measurement_selection',
                        value: 'PT1'
                    },
                    {
                        element_id: '#measurement_range_k',
                        value: 1
                    },
                    {
                        element_id: '#measurement_range_t',
                        value: 3
                    }
                ]
            }
        },
    ],
    videos: [
        'https://www.youtube.com/embed/uRe4JTKmkeQ'
    ]
}