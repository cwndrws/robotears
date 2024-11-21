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
content and only return the content of the following text:

${content}`;
    }

    analyzeEmotionsPrompt (content) {
        return `You are an expert on human emotions.
What emotions would a normal, well-adjusted, intellegent human feel while
reading the following text:

${content}`;
    }

    composeMusicPrompt (emotionalDescription) {
        return `You are an expert musical composer. Compose a piece of
music for a string quartet that evokes the following emotions:

${emotionalDescription}`;
    }

    async prompt(text) {
        return this.client.prompt(text);
    }
}

export {
    Prompter
};
