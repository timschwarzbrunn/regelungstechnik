# regelungstechnik
Educational tool developed as part of the bachelor thesis "Learning Control Systems Engineering with Interactive Visualization".

[🔗 timschwarzbrunn.github.io/regelungstechnik/](https://timschwarzbrunn.github.io/regelungstechnik/)


# How to contribute to the project.
Write your own educational scrollytelling lectures and commit them.
Create a new .js-file inside the scrollytelling_stories directory, import it inside the index.html-file and import the new story-object in the scrollytelling_config.js-file.

The scrollytelling-js-file needs to have the following structure:

```
your_story_object = {
    title: 'Your Story Name (this will be shown in the navigation menu).',
    content: [
        {
            section_html_text: 'Text Part 1',
            control_loop_behaviour: {
                marked: [],
                value: []
            }
        },
        {
            section_html_text: 'Text Part 2',
            control_loop_behaviour: {
                marked: [],
                value: []
            }
        },
    ],
    videos: ['your_embedded_video_link']
}
```

For more details see existing scrollytelling-js-files.
