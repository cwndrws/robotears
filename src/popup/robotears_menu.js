import { getCurrentPageText, KeyValueStore } from '../browser_utilities';
import { Sequence } from '../audio/synth';
import { Prompter } from '../ai';

// All our dom elements
const prompter = new Prompter();
const kv = new KeyValueStore("roboTearsPromptCache");
const filterPromptCacheKey = "cachedFilterPrompt";
const evaluatePromptCacheKey = "cachedEvaluatePrompt";
const composePromptCacheKey = "cachedComposePrompt";
const scrapeButton = document.getElementById("scrapeButton");
const filterContentPrompt = document.getElementById("filterContentPrompt");
const filterContentButton = document.getElementById("filterContentButton");
const cacheFilterContentPromptButton = document.getElementById("cacheFilterContentPromptButton");
const evaluateEmotionsPrompt = document.getElementById("evaluateEmotionsPrompt");
const evaluateEmotionsButton = document.getElementById("evaluateEmotionsButton");
const cacheEvaluateEmotionsPromptButton = document.getElementById("cacheEvaluateEmotionsPromptButton");
const composeMusicPrompt = document.getElementById("composeMusicPrompt");
const composeMusicButton = document.getElementById("composeMusicButton");
const cacheComposeMusicPromptButton = document.getElementById("cacheComposeMusicPromptButton");
const playButton = document.getElementById("playButton");
let composition = "";

async function scrapeClick() {
    const text = await getCurrentPageText();
    const prompt = prompter.filterContentPrompt(text);
    filterContentPrompt.value = prompt;
    filterContentPrompt.disabled = false;
    filterContentButton.disabled = false;
    cacheFilterContentPromptButton.disabled = false;
    return false;
}

async function filterClick() {
    const prompt = filterContentPrompt.value;
    const promptResponse = await prompter.prompt(prompt);
    console.log(promptResponse);
    const nextPrompt = prompter.analyzeEmotionsPrompt(promptResponse);
    evaluateEmotionsPrompt.value = nextPrompt;
    evaluateEmotionsPrompt.disabled = false;
    evaluateEmotionsButton.disabled = false;
    cacheEvaluateEmotionsPromptButton.disabled = false;
    return false;
}

async function clearCachedFilterPrompt() {
    cacheFilterContentPromptButton.disabled = true;
    cacheFilterContentPromptButton.innerHTML = "Cache prompt";
    await kv.delete(filterPromptCacheKey);
    filterContentPrompt.value = "";
    scrapeButton.disabled = false;
}

async function cacheFilterPrompt() {
    cacheFilterContentPromptButton.disabled = true;
    const prompt = filterContentPrompt.value;
    await kv.set(filterPromptCacheKey, prompt);
    scrapeButton.disabled = true;
    cacheFilterContentPromptButton.innerHTML = "Clear cache";
    cacheFilterContentPromptButton.removeEventListener('click', cacheFilterPrompt);
    cacheFilterContentPromptButton.addEventListener('click', clearCachedFilterPrompt);
    cacheFilterContentPromptButton.disabled = false;
}

async function checkForCachedFilterPrompt() {
    const cachedFilterPrompt = await kv.get(filterPromptCacheKey);
    if (cachedFilterPrompt === null) {
        return;
    }
    filterContentPrompt.value = cachedFilterPrompt;
    scrapeButton.disabled = true;
    filterContentButton.disabled = false;
    filterContentPrompt.disabled = false;
    cacheFilterContentPromptButton.innerHTML = "Clear cache";
    cacheFilterContentPromptButton.removeEventListener('click', cacheFilterPrompt);
    cacheFilterContentPromptButton.addEventListener('click', clearCachedFilterPrompt);
    cacheFilterContentPromptButton.disabled = false;
}

async function emotionalEvalClick() {
    const prompt = evaluateEmotionsPrompt.value;
    const promptResponse = await prompter.prompt(prompt);
    console.log(promptResponse);
    const nextPrompt = prompter.composeMusicPrompt(promptResponse);
    composeMusicPrompt.value = nextPrompt
    composeMusicPrompt.disabled = false;
    composeMusicButton.disabled = false;
    cacheComposeMusicPromptButton.disabled = false;
    return false;
}

async function clearCachedEvaluatePrompt() {
    cacheEvaluateEmotionsPromptButton.disabled = true;
    cacheEvaluateEmotionsPromptButton.innerHTML = "Cache prompt";
    await kv.delete(evaluatePromptCacheKey);
    evaluateEmotionsPrompt.value = "";
    filterContentButton.disabled = false;
}

async function cacheEvaluatePrompt() {
    cacheEvaluateEmotionsPromptButton.disabled = true;
    const prompt = evaluateEmotionsPrompt.value;
    await kv.set(evaluatePromptCacheKey, prompt);
    filterContentButton.disabled = true;
    filterContentPrompt.disabled = true;
    cacheEvaluateEmotionsPromptButton.innerHTML = "Clear cache";
    cacheEvaluateEmotionsPromptButton.removeEventListener('click', cacheEvaluatePrompt);
    cacheEvaluateEmotionsPromptButton.addEventListener('click', clearCachedFilterPrompt);
    cacheEvaluateEmotionsPromptButton.disabled = false;
}

async function checkForCachedEvaluatePrompt() {
    const cachedEvaluatePrompt = await kv.get(evaluatePromptCacheKey);
    if (cachedEvaluatePrompt === null) {
        return;
    }
    evaluateEmotionsPrompt.value = cachedEvaluatePrompt;
    filterContentButton.disabled = true;
    filterContentPrompt.disabled = true;
    evaluateEmotionsButton.disabled = false;
    evaluateEmotionsPrompt.disabled = false;
    cacheEvaluateEmotionsPromptButton.innerHTML = "Clear cache";
    cacheEvaluateEmotionsPromptButton.removeEventListener('click', cacheEvaluatePrompt);
    cacheEvaluateEmotionsPromptButton.addEventListener('click', clearCachedEvaluatePrompt);
    cacheEvaluateEmotionsPromptButton.disabled = false;
}

async function composeClick() {
    const prompt = composeMusicPrompt.value;
    composition = await prompter.prompt(prompt);
    playButton.disabled = false;
}

async function clearCachedComposePrompt() {
    cacheComposeMusicPromptButton.disabled = true;
    cacheComposeMusicPromptButton.innerHTML = "Cache prompt";
    await kv.delete(composePromptCacheKey);
    composeMusicPrompt.value = "";
    evaluateEmotionsButton.disabled = false;
    playButton.disabled = true;
}

async function cacheComposePrompt() {
    cacheComposeMusicPromptButton.disabled = true;
    const prompt = composeMusicPrompt.value;
    await kv.set(composePromptCacheKey, prompt);
    evaluateEmotionsButton.disabled = true;
    evaluateEmotionsPrompt.disabled = true;
    cacheComposeMusicPromptButton.innerHTML = "Clear cache";
    cacheComposeMusicPromptButton.removeEventListener('click', cacheComposePrompt);
    cacheComposeMusicPromptButton.addEventListener('click', clearCachedComposePrompt);
    cacheComposeMusicPromptButton.disabled = false;
}

async function checkForCachedComposePrompt() {
    const cachedComposePrompt = await kv.get(composePromptCacheKey);
    if (cachedComposePrompt === null) {
        return;
    }
    composeMusicPrompt.value = cachedComposePrompt;
    evaluateEmotionsButton.disabled = true;
    evaluateEmotionsPrompt.disabled = true;
    composeMusicButton.disabled = false;
    composeMusicPrompt.disabled = false;
    playButton.disabled = false;
    cacheComposeMusicPromptButton.innerHTML = "Clear cache";
    cacheComposeMusicPromptButton.removeEventListener('click', cacheComposePrompt);
    cacheComposeMusicPromptButton.addEventListener('click', clearCachedComposePrompt);
    cacheComposeMusicPromptButton.disabled = false;
}

async function play() {
    console.log(`raw composition:\n${composition}`);
    const compositionJson = JSON.parse(composition);
    const sequence = Sequence.parse(compositionJson);
    console.log(`composition:\n${JSON.stringify(sequence, null, 2)}`);
}

function setupEventListeners() {
    scrapeButton.addEventListener('click', scrapeClick);
    filterContentButton.addEventListener('click', filterClick);
    cacheFilterContentPromptButton.addEventListener('click', cacheFilterPrompt);
    evaluateEmotionsButton.addEventListener('click', emotionalEvalClick);
    cacheEvaluateEmotionsPromptButton.addEventListener('click', cacheEvaluatePrompt);
    composeMusicButton.addEventListener('click', composeClick);
    cacheComposeMusicPromptButton.addEventListener('click', cacheComposePrompt);
    playButton.addEventListener('click', play);
}

function populatePromptsFromCache() {
    checkForCachedFilterPrompt();
    checkForCachedEvaluatePrompt();
    checkForCachedComposePrompt();
}

window.onload = () => {
    setupEventListeners();
    populatePromptsFromCache();
}
