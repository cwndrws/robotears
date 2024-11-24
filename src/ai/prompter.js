import { OpenAiClient } from './openai';

class Prompter {
    constructor() {
        this.client = new OpenAiClient();
    }

    filterContentPrompt (content) {
        return `The following text was extracted by
grabbing all of the visible text on the screen for a website. This includes
both the site content as well as all of the user interface elements from the
website. Please take a look and filter out all of the user interface text
content and return a summary of the of the following text:

${content}`;
    }

    analyzeEmotionsPrompt (content) {
        return `You are an expert on human emotions.
What emotions would a normal, well-adjusted, intellegent human feel while
reading the following text:

${content}`;
    }

    composeMusicPrompt (emotionalDescription) {
        return `You are an expert musical composer. I'm going to ask you to
compose a piece of music and I would like your output to be structured as a json
object. The top-level keys of this json object must be "title", a string
indicating the name of the given piece, "tempo", the number of quarter-note
beats per minute at which performers should perform this music, and "tracks", an
array of objects that I will describe next. There should be one "track" object
per instrument in the piece. Each object in the "tracks" array, must have the
following keys: "events", an array of objects that I will descbibe in a minute
and "engineParams", an object containing an "instrument" key, which should be
set to the instrument that should be performing that "track". Each note in the
composition is represented in an object inside the "events" array on the track
object. Each notes needs to have the following keys: "frequency", a decimal
number indicating the pitch that should be played in hertz, "duration", a number
representing the amount of time the note should be played in milliseconds,
"velocity", a number between 0.0 and 1.0 that indicates how loud the note should
be played where 0.0 represents silence and 1.0 is as loud as possible, and
"type", a string indicating what type of event should happen (either "note" when
a note should be played or "rest" if no note should be played. If the "type"
indicates "rest" frequency and velocity can both be zero. Here's an example of
this format for you to follow:

{
    "title": "Robo Tears",
    "tempo": 110.0,
    "tracks": [
        {
            "engineParams": {
                "instrument": "violin"
            },
            "events": [
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                }
            ]
        },
        {
            "engineParams": {
                "instrument": "violin"
            },
            "events": [
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                }
            ]
        },
        {
            "engineParams": {
                "instrument": "viola"
            },
            "events": [
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                }
            ]
        },
        {
            "engineParams": {
                "instrument": "cello"
            },
            "events": [
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                },
                {
                    "frequency": 440.0,
                    "duration": 136.36,
                    "velocity": 0.75,
                    "type": "note",
                }
            ]        }
    ]
}

Compose a piece of music for a string quartet that evokes the following
emotions:

${emotionalDescription}`;
    }

    async prompt(text) {
        return this.client.prompt(text);
    }
}

export {
    Prompter
};
