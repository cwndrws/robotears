async function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    const form = findForm("robo_tears_form");
    const formData = new FormData(form);

    // const inputValue = document.getElementById("robo_tears_prompt").value;
    // alert(`got ${inputValue}!`);

    const text = await getCurrentPageText();
    console.log(`got the following page text\n${text}`);
    return false;
}


function findForm(name) {
    const form = document.getElementById(name);
    return form;
}

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

form = findForm("robo_tears_form");
if (form.attachEvent) {
    form.attachEvent("submit", processForm)
} else {
    form.addEventListener("submit", processForm)
}
