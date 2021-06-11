story_controlled_system = {
    title: 'Die Regelstrecke - das zu regelnde System.',
    content: [
        {
            section_html_text: 'Die <b>Regelstrecke</b> beschreibt das zu regelende System.<br><br>Dieses System muss vor der Regelung analysiert werden. Die Grundlagen hierfür liegen in der <b>Systemtheorie</b>.',
            control_loop_behaviour: {
                marked: ['#controlled_system'],
                hidden: ['#input_variable', '#controller', '#output_variable', '#measuring_element', '#line_input_to_sum_junction', '#line_sum_junction_to_controller', '#path_to_measurement', '#path_from_measurement', '#junction_to_measurement', '#sum_junction', '#text_sum_junction_plus', '#text_sum_junction_minus', '#text_control_difference'],
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
                        value: 0
                    }
                ]
            }
        },
        {
            section_html_text: 'Bei einfachen technischen Systemen wird <b>eine</b> Ausgangsvariable über <b>eine</b> Eingangsvariable manipuliert (<b>SISO</b>: <b>S</b>ingle <b>I</b>nput, <b>S</b>ingle <b>O</b>utput).',
            control_loop_behaviour: {
                marked: ['#line_controller_to_system', '#line_system_to_output']
            }
        },
        {
            section_html_text: 'Systeme weisen <b>Energiespeicher</b> auf. Beispiele für Energiespeicher sind mechanische Federn oder elektrische Kondensatoren. Die Anzahl der Energiespeicher in einem System entscheidet über die Ordnung des Systems.',
            control_loop_behaviour: {
                
            }
        },
        {
            section_html_text: 'Systeme mit einem <b>Energiespeicher</b> werden <b>PT1</b>-Strecken genannt. Ein einzelner Kondensator mit einem Widerstand ist beispielsweise eine PT1-Strecke. Eine PT1-Strecke wird durch ihren <b>Verstärkungsfaktor K</b> und ihre <b>Zeitkonstante T</b> beschrieben.',
            control_loop_behaviour: {
                marked: ['#system_selection'],
                value: [
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
                ]
            }
        },
        {
            section_html_text: 'Der <b>Verstärkungsfaktor K</b> eines PT1-Elements beschreibt den Faktor, mit welchem das Eingangssignal (in diesem Fall der Einheitssprung mit dem Wert 1) multipliziert wird.<br><br>Probiere es selber aus und beobachte, wie sich der Kurvenverlauf verändert.',
            control_loop_behaviour: {
                marked: ['#range_slider_system_k'],
                value: [
                    {
                        element_id: '#system_selection',
                        value: 'PT1'
                    }
                ]
            }
        },
        {
            section_html_text: 'Die <b>Zeitkonstante T</b> eines PT1-Elements beschreibt die Trägheit des Systems. Je größer die Zeitkonstante, desto länger benötigt der Energiespeicher, seinen Wert zu ändern. Nach Ablauf einer Zeitkonstanten T sind 63% des Endwertes erreicht. Nach Ablauf von fünf Zeitkonstanten T sind ca. 99% des Endwertes erreicht.<br><br>Probiere es selber aus und beobachte, wie sich der Kurvenverlauf verändert.',
            control_loop_behaviour: {
                marked: ['#range_slider_system_t'],
                value: [
                    {
                        element_id: '#system_selection',
                        value: 'PT1'
                    }
                ]
            }
        },
    ],
    videos: [
        'https://www.youtube.com/embed/zCnjzcjAbAc',
        'https://www.youtube.com/embed/3Bav4DuICcI',
        'https://www.youtube.com/embed/sXHcXjPTeTk'
    ]
}