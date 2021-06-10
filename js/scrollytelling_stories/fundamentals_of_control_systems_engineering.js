 story_fundamentals_of_control_systems_engineering = {
    title: 'Was ist Regelungstechnik?',
    content: [
        {
            section_html_text: '<b>DIN IEC 60050-351:</b><br> <i>Die Regelung ist ein Vorgang, bei dem fortlaufend eine variable Größe, die Regelgröße, erfasst (gemessen), mit einer anderen variablen Größe, der Führungsgröße, verglichen und im Sinne einer Angleichung an die Führungsgröße beeinflusst wird.</i><br><br>Ganz schön trocken, was?<br>Versuchen wir es einfacher zu erklären.',
            control_loop_behaviour: {
            }
        },
        {
            section_html_text: 'Im Mittelpunkt einer jeden Regelung steht das zu regelnde technische System. Dieses System wird allgemein <b>Regelstrecke</b> genannt.',
            control_loop_behaviour: {
                marked: ['#controlled_system']
            }
        },
        {
            section_html_text: 'Die <b>Regelstrecke</b> besitzt am Eingang ein Stellglied, worüber das Ausgangsverhalten des Systems beeinflusst werden kann.',
            control_loop_behaviour: {
                marked: ['#controlled_system', '#line_controller_to_system', '#line_system_to_output']
            }
        },
        {
            section_html_text: 'Das Ziel der Regelung ist es, durch geeignete Beeinflussung des Systems, dessen Verhalten wie gewünscht zu kontrollieren.',
            control_loop_behaviour: {
                marked: ['#controlled_system']
            }
        },
            ],
    videos: [
        'https://www.youtube.com/embed/l26IGS2RlM0',
        'https://www.youtube.com/embed/1L07JzTJITw'
    ]
}