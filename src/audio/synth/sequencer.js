class Sequence {
    static requiredFields = ["tempo", "tracks"];

    static parse (input) {
        for (const requiredField in requiredFields) {
            if (!Object.hasOwn(input, requiredField)) {
                throw new Error(`Error parsing sequence. The required field, ${requiredField} was missing from the following sequence input:\n${JSON.stringify(input, null, 2)}`);
            }
        }

        const tempo = input.tempo;
        const tracks = input.tracks.map((track, trackIndex) => {
            return Track.parse(track, trackIndex);
        });

        return new Sequence(tempo, tracks);
    }

    constructor(tempo, tracks) {
        this.tempo = tempo;
        this.tracks = tracks;
    }
}

class Track {
    static requiredFields = ["events", "engineParams"];

    static parse(input, index) {
        for (const requiredField in requiredFields) {
            if (!Object.hasOwn(input, requiredField)) {
                throw new Error(`Error parsing track at index ${index}. The required field, ${requiredField} was missing from the following track input:\n${JSON.stringify(input, null, 2)}`);
            }
        }

        const events = input.events.map((event, eventIndex) => {
            return Event.parse(event, eventIndex, index);
        });
        const engineParams = input.engineParams;

        return new Track(events, engineParams);
    }

    constructor(events, engineParams) {
        this.events = events;
        this.engineParams = engineParams;
    }
}

class Event {
    static requiredFields = ["frequency", "duration", "velocity", "type"];

    static parse (input, index, trackIndex) {
        for (const requiredField in requiredFields) {
            if (!Object.hasOwn(input, requiredField)) {
                throw new Error(`Error parsing event at index ${index} on track at index ${trackIndex}. The required field, ${requiredField} was missing from the following event input:\n${JSON.stringify(input, null, 2)}`);
            }
        }

        const frequency = input.frequency;
        const duration = input.duration;
        const velocity = input.velocity;
        const type = input.type;

        return new Event(frequency, duration, velocity, type);
    }

    constructor(frequency, duration, velocity, type) {
        this.frequency = frequency;
        this.duration = duration;
        this.velocity = velocity;
        this.type = type;
    }
}

export {
    Sequence
}
