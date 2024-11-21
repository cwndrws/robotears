import { getCurrentPageText } from '../browser_utilities';
import { Prompter } from '../ai';

const prompter = new Prompter();
const scrapeButton = document.getElementById("scrapeButton");
const filterContentPrompt = document.getElementById("filterContentPrompt");
const filterContentButton = document.getElementById("filterContentButton");
const evaluateEmotionsPrompt = document.getElementById("evaluateEmotionsPrompt");
const evaluateEmotionsButton = document.getElementById("evaluateEmotionsButton");
const composeMusicPrompt = document.getElementById("composeMusicPrompt");
const composeMusicButton = document.getElementById("composeMusicButton");

async function scrapeClick() {
    const text = await getCurrentPageText();
    const prompt = prompter.filterContentPrompt(text);
    filterContentPrompt.value = prompt;
    filterContentPrompt.disabled = false;
    filterContentButton.disabled = false;
    return false;
}

async function filterClick() {
    const prompt = filterContentPrompt.value;
    const promptResponse = await prompter.prompt(prompt);
    console.log(promptResponse);
}

async function emotionalEvalClick() {
    console.log(`clicked Evaluate Emotions!`);
    return false;
}

async function composeClick() {
    console.log(`clicked Compose!`);
    return false;
}

// Setting all our click listeners
scrapeButton.addEventListener('click', scrapeClick);
filterContentButton.addEventListener('click', filterClick);
evaluateEmotionsButton.addEventListener('click', emotionalEvalClick);
composeMusicButton.addEventListener('click', composeClick);
