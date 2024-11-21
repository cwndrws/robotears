const getPageText = async () => {
    const pageText = document.body.innerText;
    return pageText;
}

async function getCurrentPageText() {
    const tabId = await currentTabId();
    const executionDetails = {
        func: getPageText,
        target: {
            tabId: tabId
        }
    };
    try {
        const results = await browser.scripting.executeScript(executionDetails);
        if (results.length < 1 || results[0] === undefined) {
            console.error(`could not scrape page contents`);
            return null;
        }
        return results[0].result;
    } catch (err) {
        console.error(`could not scrape page contents: ${err}`);
        return null;
    }
}

async function currentTabId() {
    const tabs = await browser.tabs.query({currentWindow: true, active: true});
    const tab = tabs[0];
    return tab.id;
}

export {
    getCurrentPageText
}
