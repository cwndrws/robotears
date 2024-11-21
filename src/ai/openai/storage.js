const OPEN_AI_KEY_STORAGE_KEY = "robotears_open_ai_key";

async function setOpenAiKey(key) {
    const storage_obj = {};
    storage_obj[OPEN_AI_KEY_STORAGE_KEY] = key;
    await browser.storage.local.set(storage_obj);
}

async function getOpenAiKey() {
    return await browser.storage.local.get(OPEN_AI_KEY_STORAGE_KEY);
}

async function clearOpenAiKey () {
    return await browser.storage.local.remove(OPEN_AI_KEY_STORAGE_KEY);
}

export {
    setOpenAiKey,
    getOpenAiKey,
    clearOpenAiKey,
}
