const getPageText = async () => {
    console.log(`we're in!`);
    const pageText = document.body.innerText;
    console.log(`got the following page text from inside the page\n${pageText}`);
    return pageText;
}

async function getCurrentPageText() {
    console.log("about to execute the thing");
    const tabId = await currentTabId();
    const executionDetails = {
        func: getPageText,
        target: {
            tabId: tabId
        }
    };
    let results = null;
    try {
        results = await browser.scripting.executeScript(executionDetails);
        console.log(results);
    } catch (err) {
        console.error(`failed to execute script: ${err}`);
    }
    console.log(JSON.stringify(results));
    return results;
}

async function currentTabId() {
    const tabs = await browser.tabs.query({currentWindow: true, active: true});
    const tab = tabs[0];
    return tab.id;
}

export { getCurrentPageText };
