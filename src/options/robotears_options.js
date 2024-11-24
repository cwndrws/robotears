import { OpenAiClient } from '../ai/openai';

async function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    const client = new OpenAiClient();

    const openAiKeyInputValue = document.getElementById("open_ai_key").value;

    await client.setKey(openAiKeyInputValue);
    return false;
}

const form = document.getElementById("robo_tears_options_form");
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}
