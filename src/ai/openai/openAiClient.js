import { getOpenAiKey } from './storage.js';

class OpenAiClient {
    async prompt(text) {
        const key = await getOpenAiKey();
        if (Object.keys(key).length < 1) {
            console.error("Open AI Key must be set in extension settings");
            return null;
        }
        console.log(Object.keys(key));
    }
}

export {
    OpenAiClient
}
