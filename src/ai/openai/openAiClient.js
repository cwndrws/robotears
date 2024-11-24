import { KeyValueStore } from '../../browser_utilities';

const openAiUrl = "https://api.openai.com/v1";
const defaultModel = "gpt-4o";
const openAiClientConfigPrefix = "openAiClientConfig";
const apiKeyKey = "apiKey";

class OpenAiClient {
    promptTextLimit = 2500;

    constructor (model) {
        this.model = (model === undefined) ? defaultModel : model;
        this.configKV = new KeyValueStore(openAiClientConfigPrefix);
    }

    async prompt(text) {
        const method = "POST"
        const url = `${openAiUrl}/chat/completions`
        let promptText = text;
        if (promptText.length > this.promptTextLimit) {
            promptText = promptText.slice(0, this.promptTextLimit);
        }
        const data = {
            model: this.model,
            messages: [{
                role: "user",
                content: promptText
            }]
        };
        const resp = await this.makeAuthenticatedRequest(method, url, data);
        const message = (await resp.json())?.choices?.[0]?.message?.content;
        return message;
    }

    async makeAuthenticatedRequest(method, url, data) {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await this.getKey()}`
        };
        const body = JSON.stringify(data);
        return fetch(url, { method, headers, body });
    }

    async getKey() {
        if (this.apiKey === undefined) { // use memoized value if set
            const stored = await this.configKV.get(apiKeyKey);
            if (stored === null) {
                throw new Error(`KEY NOT SET. Open AI Key must be set in extension settings`);
            }
            this.apiKey = stored;
        }
        return this.apiKey;
    }

    async setKey(key) {
        this.apiKey = undefined; // unset if previously set
        await this.configKV.set(apiKeyKey, key); // enough keys for ya?
        this.apiKey = key;
    }

    async clearKey() {
        this.apiKey = undefined; // unset if previously set
        await this.configKV.delete(apiKeyKey);
    }
}

export {
    OpenAiClient
}
